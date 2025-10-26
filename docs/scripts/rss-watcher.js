/**
 * RSS Feed Watcher
 * Dashboard Sabrina Costa Documentation
 * 
 * Features:
 * - File system watching for changes
 * - Automatic RSS feed regeneration
 * - Change detection and notifications
 * - Multiple feed types support
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { execSync } = require('child_process');

class RSSWatcher {
  constructor() {
    this.docsPath = path.resolve(__dirname, '..');
    this.watchPaths = [
      path.join(this.docsPath, 'tutorials'),
      path.join(this.docsPath, 'how-to-guides'),
      path.join(this.docsPath, 'reference'),
      path.join(this.docsPath, 'explanation'),
      path.join(this.docsPath, '*.md')
    ];
    this.isGenerating = false;
    this.debounceTimeout = null;
    this.init();
  }

  init() {
    console.log('Starting RSS feed watcher...');
    this.setupWatcher();
    this.generateInitialFeeds();
  }

  /**
   * Setup file system watcher
   */
  setupWatcher() {
    const watcher = chokidar.watch(this.watchPaths, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true
    });

    watcher.on('change', (filePath) => {
      console.log(`File changed: ${filePath}`);
      this.handleFileChange(filePath);
    });

    watcher.on('add', (filePath) => {
      console.log(`File added: ${filePath}`);
      this.handleFileChange(filePath);
    });

    watcher.on('unlink', (filePath) => {
      console.log(`File removed: ${filePath}`);
      this.handleFileChange(filePath);
    });

    console.log('Watching for changes in:', this.watchPaths);
  }

  /**
   * Handle file change with debouncing
   */
  handleFileChange(filePath) {
    if (this.isGenerating) {
      console.log('RSS generation already in progress, skipping...');
      return;
    }

    // Debounce to avoid multiple rapid regenerations
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.regenerateFeeds(filePath);
    }, 1000);
  }

  /**
   * Regenerate RSS feeds
   */
  async regenerateFeeds(changedFile) {
    this.isGenerating = true;
    console.log(`Regenerating RSS feeds due to change in: ${changedFile}`);

    try {
      // Run the RSS generation script
      execSync('node scripts/generate-rss.js', { 
        cwd: this.docsPath,
        stdio: 'inherit'
      });

      console.log('RSS feeds regenerated successfully!');
      
      // Log the change
      this.logChange(changedFile);
      
    } catch (error) {
      console.error('Error regenerating RSS feeds:', error.message);
    } finally {
      this.isGenerating = false;
    }
  }

  /**
   * Generate initial feeds
   */
  generateInitialFeeds() {
    console.log('Generating initial RSS feeds...');
    try {
      execSync('node scripts/generate-rss.js', { 
        cwd: this.docsPath,
        stdio: 'inherit'
      });
      console.log('Initial RSS feeds generated!');
    } catch (error) {
      console.error('Error generating initial feeds:', error.message);
    }
  }

  /**
   * Log change for tracking
   */
  logChange(filePath) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      file: filePath,
      action: 'rss_regenerated'
    };

    const logPath = path.join(this.docsPath, 'feeds', 'change-log.json');
    let logData = [];

    // Load existing log
    if (fs.existsSync(logPath)) {
      try {
        logData = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      } catch (error) {
        console.warn('Could not parse existing log file');
      }
    }

    // Add new entry
    logData.push(logEntry);

    // Keep only last 100 entries
    if (logData.length > 100) {
      logData = logData.slice(-100);
    }

    // Save log
    try {
      fs.writeFileSync(logPath, JSON.stringify(logData, null, 2));
    } catch (error) {
      console.warn('Could not write to log file');
    }
  }

  /**
   * Get RSS feed statistics
   */
  getStats() {
    const feedsPath = path.join(this.docsPath, 'feeds');
    const stats = {
      totalFeeds: 0,
      lastGenerated: null,
      feedSizes: {}
    };

    if (fs.existsSync(feedsPath)) {
      const files = fs.readdirSync(feedsPath);
      stats.totalFeeds = files.filter(file => file.endsWith('.xml')).length;
      
      // Get file sizes
      files.forEach(file => {
        if (file.endsWith('.xml')) {
          const filePath = path.join(feedsPath, file);
          const stat = fs.statSync(filePath);
          stats.feedSizes[file] = stat.size;
          if (!stats.lastGenerated || stat.mtime > stats.lastGenerated) {
            stats.lastGenerated = stat.mtime;
          }
        }
      });
    }

    return stats;
  }
}

// Start the watcher
const watcher = new RSSWatcher();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down RSS watcher...');
  process.exit(0);
});

// Export for potential external use
module.exports = RSSWatcher;
