/**
 * Navigation Enhancement System
 * Dashboard Sabrina Costa Documentation
 * 
 * Features:
 * - Breadcrumbs generation
 * - Table of Contents (TOC) with sticky behavior
 * - Previous/Next navigation
 * - Back to top button
 * - Smooth scrolling
 * - Active section highlighting
 */

class NavigationSystem {
  constructor() {
    this.toc = [];
    this.currentSection = null;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    this.generateBreadcrumbs();
    this.generateTOC();
    this.generatePrevNext();
    this.createBackToTop();
    this.setupEventListeners();
    this.highlightActiveSection();
  }

  /**
   * Generate breadcrumbs based on current page path
   */
  generateBreadcrumbs() {
    const path = window.location.pathname;
    const pathSegments = path.split('/').filter(segment => segment && segment !== 'docs');
    
    if (pathSegments.length === 0) return;

    const breadcrumbContainer = document.getElementById('breadcrumbs');
    if (!breadcrumbContainer) return;

    const breadcrumbList = document.createElement('ol');
    breadcrumbList.className = 'breadcrumb-list';

    // Add home link
    const homeItem = this.createBreadcrumbItem('Home', '/docs/', false);
    breadcrumbList.appendChild(homeItem);

    // Add path segments
    let currentPath = '/docs/';
    pathSegments.forEach((segment, index) => {
      currentPath += segment + '/';
      const isLast = index === pathSegments.length - 1;
      const title = this.formatBreadcrumbTitle(segment);
      const item = this.createBreadcrumbItem(title, currentPath, isLast);
      breadcrumbList.appendChild(item);
    });

    breadcrumbContainer.appendChild(breadcrumbList);
  }

  createBreadcrumbItem(title, href, isLast) {
    const item = document.createElement('li');
    item.className = 'breadcrumb-item';

    if (isLast) {
      item.className += ' active';
      const text = document.createElement('span');
      text.className = 'breadcrumb-text';
      text.textContent = title;
      item.appendChild(text);
    } else {
      const link = document.createElement('a');
      link.className = 'breadcrumb-link';
      link.href = href;
      link.textContent = title;
      item.appendChild(link);
    }

    if (!isLast) {
      const separator = document.createElement('span');
      separator.className = 'breadcrumb-separator';
      separator.textContent = '›';
      item.appendChild(separator);
    }

    return item;
  }

  formatBreadcrumbTitle(segment) {
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Generate Table of Contents from page headings
   */
  generateTOC() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;

    const tocContainer = document.getElementById('toc');
    if (!tocContainer) return;

    // Create TOC structure
    const tocWrapper = document.createElement('div');
    tocWrapper.className = 'toc-container toc-sticky';

    const header = document.createElement('div');
    header.className = 'toc-header';
    
    const title = document.createElement('h3');
    title.className = 'toc-title';
    title.textContent = 'Table of Contents';
    
    const toggle = document.createElement('button');
    toggle.className = 'toc-toggle';
    toggle.textContent = 'Collapse';
    toggle.addEventListener('click', () => this.toggleTOC());

    header.appendChild(title);
    header.appendChild(toggle);

    const nav = document.createElement('nav');
    nav.className = 'toc-nav';
    nav.setAttribute('aria-label', 'Table of Contents');

    // Generate TOC items
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const id = heading.id || this.generateHeadingId(heading.textContent);
      
      if (!heading.id) {
        heading.id = id;
      }

      const tocItem = this.createTOCItem(heading.textContent, id, level, index);
      nav.appendChild(tocItem);

      this.toc.push({
        id,
        title: heading.textContent,
        level,
        element: heading,
        tocItem
      });
    });

    tocWrapper.appendChild(header);
    tocWrapper.appendChild(nav);
    tocContainer.appendChild(tocWrapper);
  }

  createTOCItem(title, id, level, index) {
    const item = document.createElement('div');
    item.className = `toc-item toc-level-${level}`;

    const link = document.createElement('a');
    link.className = 'toc-link';
    link.href = `#${id}`;
    link.textContent = title;
    link.setAttribute('data-index', index);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      this.scrollToSection(id);
    });

    item.appendChild(link);
    return item;
  }

  generateHeadingId(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  toggleTOC() {
    const nav = document.querySelector('.toc-nav');
    const toggle = document.querySelector('.toc-toggle');
    
    if (nav.classList.contains('toc-collapsed')) {
      nav.classList.remove('toc-collapsed');
      toggle.textContent = 'Collapse';
    } else {
      nav.classList.add('toc-collapsed');
      toggle.textContent = 'Expand';
    }
  }

  /**
   * Generate Previous/Next navigation
   */
  generatePrevNext() {
    const prevNextContainer = document.getElementById('prev-next-nav');
    if (!prevNextContainer) return;

    const navigation = this.getNavigationData();
    if (!navigation.prev && !navigation.next) return;

    const container = document.createElement('div');
    container.className = 'prev-next-container';

    // Previous link
    if (navigation.prev) {
      const prevItem = this.createPrevNextItem(navigation.prev, 'prev');
      container.appendChild(prevItem);
    } else {
      const emptyDiv = document.createElement('div');
      container.appendChild(emptyDiv);
    }

    // Next link
    if (navigation.next) {
      const nextItem = this.createPrevNextItem(navigation.next, 'next');
      container.appendChild(nextItem);
    } else {
      const emptyDiv = document.createElement('div');
      container.appendChild(emptyDiv);
    }

    prevNextContainer.appendChild(container);
  }

  createPrevNextItem(item, direction) {
    const wrapper = document.createElement('div');
    wrapper.className = `prev-next-item prev-next-${direction}`;

    const link = document.createElement('a');
    link.className = 'prev-next-link';
    link.href = item.url;

    const arrow = document.createElement('span');
    arrow.className = 'prev-next-arrow';
    arrow.textContent = direction === 'prev' ? '←' : '→';

    const content = document.createElement('div');
    content.className = 'prev-next-content';

    const label = document.createElement('div');
    label.className = 'prev-next-label';
    label.textContent = direction === 'prev' ? 'Previous' : 'Next';

    const title = document.createElement('div');
    title.className = 'prev-next-title';
    title.textContent = item.title;

    const description = document.createElement('div');
    description.className = 'prev-next-description';
    description.textContent = item.description;

    content.appendChild(label);
    content.appendChild(title);
    content.appendChild(description);

    if (direction === 'prev') {
      link.appendChild(arrow);
      link.appendChild(content);
    } else {
      link.appendChild(content);
      link.appendChild(arrow);
    }

    wrapper.appendChild(link);
    return wrapper;
  }

  getNavigationData() {
    // This would typically come from a navigation configuration
    // For now, we'll use a simple implementation
    const currentPath = window.location.pathname;
    const navigation = {
      prev: null,
      next: null
    };

    // Simple navigation mapping (would be more sophisticated in practice)
    const navMap = {
      '/docs/tutorials/01-quickstart.md': {
        next: {
          title: 'Primeiro Deploy',
          description: 'Aprenda a fazer o primeiro deploy do projeto',
          url: '/docs/tutorials/02-primeiro-deploy.md'
        }
      },
      '/docs/tutorials/02-primeiro-deploy.md': {
        prev: {
          title: 'Quick Start',
          description: 'Guia de início rápido do projeto',
          url: '/docs/tutorials/01-quickstart.md'
        },
        next: {
          title: 'Primeiro Workflow n8n',
          description: 'Configure seu primeiro workflow de automação',
          url: '/docs/tutorials/03-primeiro-workflow-n8n.md'
        }
      }
      // Add more navigation mappings as needed
    };

    return navMap[currentPath] || navigation;
  }

  /**
   * Create back to top button
   */
  createBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    button.setAttribute('title', 'Back to top');
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    document.body.appendChild(button);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Scroll event for back to top button and active section highlighting
    window.addEventListener('scroll', () => {
      this.handleScroll();
    }, { passive: true });

    // Resize event for responsive behavior
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
  }

  handleScroll() {
    // Show/hide back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Highlight active section
    this.highlightActiveSection();
  }

  handleResize() {
    // Handle responsive behavior
    const toc = document.querySelector('.toc-container');
    if (toc && window.innerWidth <= 768) {
      toc.classList.remove('toc-sticky');
    } else if (toc && window.innerWidth > 768) {
      toc.classList.add('toc-sticky');
    }
  }

  handleKeyboardNavigation(e) {
    // ESC key to close TOC
    if (e.key === 'Escape') {
      const toc = document.querySelector('.toc-nav');
      if (toc && !toc.classList.contains('toc-collapsed')) {
        this.toggleTOC();
      }
    }
  }

  highlightActiveSection() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      const scrollPosition = window.scrollY + 100;
      let activeSection = null;

      this.toc.forEach(item => {
        const element = item.element;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;

        if (elementTop <= scrollPosition) {
          activeSection = item;
        }
      });

      if (activeSection && activeSection !== this.currentSection) {
        // Remove active class from all TOC links
        document.querySelectorAll('.toc-link').forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to current section
        if (activeSection.tocItem) {
          const link = activeSection.tocItem.querySelector('.toc-link');
          if (link) {
            link.classList.add('active');
          }
        }

        this.currentSection = activeSection;
      }
    }, 100);
  }

  scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}

// Initialize navigation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NavigationSystem();
});

// Export for potential external use
window.NavigationSystem = NavigationSystem;