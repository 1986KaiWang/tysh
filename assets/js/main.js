/**
* Template Name: MyResume - Literary Version
* Updated: May 2 2025 with Bootstrap v5.3.3
* Author: ModifiedByYou
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links and prevent default behavior
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      // 阻止默認的錨點行為
      e.preventDefault();
      
      // 獲取目標section的id (去掉#符號)
      const targetId = navmenu.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      // 如果找到目標section，滾動到該位置
      if (targetSection) {
        // 計算滾動位置，考慮到頂部固定導航的高度
        const scrollMarginTop = getComputedStyle(targetSection).scrollMarginTop;
        const scrollPosition = targetSection.offsetTop - parseInt(scrollMarginTop || 0);
        
        // 平滑滾動到目標位置
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        
        // 更新URL，但不添加#hash (使用HTML5 History API)
        if (history.pushState) {
          history.pushState(null, null, window.location.pathname);
        }
      }
      
      // 如果是移動端，關閉導航菜單
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // 更新URL，移除任何hash
    if (history.pushState) {
      history.pushState(null, null, window.location.pathname);
    }
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  function initIsotope() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      
      // 確保圖片加載完成後再初始化isotope
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
        
        // 添加動畫效果到所有portfolio項目
        let items = isotopeItem.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('item-show');
          }, 100 * index);
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    });
  }

  window.addEventListener('load', initIsotope);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   * 修改為使用History API而不是保留hash
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop || 0),
            behavior: 'smooth'
          });
          
          // 移除URL中的hash
          if (history.pushState) {
            history.pushState(null, null, window.location.pathname);
          }
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy - 改進版本
   */
  function navmenuScrollspy() {
    // 獲取所有section元素
    const sections = document.querySelectorAll('section[id]');
    
    // 當前滾動位置 (加上一個偏移量，使導航項目在section進入視窗前就被激活)
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    // 找到當前在視窗中最靠近頂部的section
    let currentSection = null;
    let minDistance = Number.MAX_VALUE;
    
    sections.forEach(section => {
      // 計算section頂部到當前滾動位置的距離
      const sectionTop = section.offsetTop;
      const distance = Math.abs(sectionTop - scrollPosition);
      
      // 如果section已經進入視窗且距離比之前找到的section更近
      if (scrollPosition >= sectionTop && distance < minDistance) {
        minDistance = distance;
        currentSection = section;
      }
    });
    
    // 如果沒有找到任何section (可能是在頁面頂部)，則選擇第一個section
    if (!currentSection && sections.length > 0) {
      currentSection = sections[0];
    }
    
    // 更新導航菜單的活動狀態
    if (currentSection) {
      const currentId = currentSection.getAttribute('id');
      document.querySelectorAll('.navmenu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }
  
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * 添加文青風格動畫效果
   */
  function addLiteraryEffects() {
    // 為標題添加淡入效果
    document.querySelectorAll('.section-title h2').forEach(title => {
      title.classList.add('fade-in');
    });
    
    // 為服務項目添加懸停效果
    document.querySelectorAll('.service-item').forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.querySelector('.icon').classList.add('pulse-animation');
      });
      item.addEventListener('mouseleave', function() {
        this.querySelector('.icon').classList.remove('pulse-animation');
      });
    });
    
    // 為關於我頁面添加文字效果
    document.querySelectorAll('.about .content h2').forEach(text => {
      text.classList.add('brush-text');
    });
    
    // 為所有portfolio項目添加懸停效果
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.classList.add('item-hover');
      });
      item.addEventListener('mouseleave', function() {
        this.classList.remove('item-hover');
      });
    });
  }
  
  window.addEventListener('load', addLiteraryEffects);

})();
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // 檢查圖標是否存在的函數
    function checkImage(url, callback) {
      const img = new Image();
      img.onload = function() { callback(true); };
      img.onerror = function() { callback(false); };
      img.src = url;
    }
    
    // 嘗試不同的路徑
    const possiblePaths = [
      'assets/img/favicon.png',
      './assets/img/favicon.png',
      '../assets/img/favicon.png',
      '/assets/img/favicon.png',
      'favicon.png',
      './favicon.png'
    ];
    
    // 檢查每個路徑
    possiblePaths.forEach(path => {
      checkImage(path, function(exists) {
        if (exists) {
          console.log('Found favicon at: ' + path);
          
          // 設置 favicon
          const faviconLink = document.querySelector('link[rel="icon"]');
          if (faviconLink) faviconLink.href = path;
          
          // 設置 apple-touch-icon (假設在同一目錄)
          const applePath = path.replace('favicon.png', 'apple-touch-icon.png');
          const appleIconLink = document.querySelector('link[rel="apple-touch-icon"]');
          if (appleIconLink) appleIconLink.href = applePath;
        }
      });
    });
  });
</script>
