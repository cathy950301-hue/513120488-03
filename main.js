document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 微互動：自訂滑鼠指標跟隨與擴散效果
    const cursor = document.getElementById('cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // 監聽可互動元素，滑鼠移入時讓指標吸附擴散
        const interactives = document.querySelectorAll('.work-img-box, .contact-link, .nav-toggle, .board-btn, .nav-link');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // 2. 隱藏式導航選單功能 (小圓點點擊彈跳展開)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // 點擊選單連結後自動關閉選單
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // 3. 滑鼠與空間感應：移動滑鼠時，背景產生極淡的微移位移 (呼吸感)
    const bgLayer = document.querySelector('.scrolling-bg-layer');
    if (bgLayer) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            bgLayer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // 4. 慢瀏覽：頁面捲動偵測柔和淡入 (Intersection Observer)
    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 淡入一次後固定，降低瀏覽負荷
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-ready');
    animatedElements.forEach(el => observer.observe(el));

    // 5. 橫向流動列滾動優化：在作品區域使用滾輪時能順暢左右滑動
    const galleryStream = document.querySelector('.gallery-stream');
    if (galleryStream) {
        galleryStream.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                galleryStream.scrollLeft += e.deltaY * 0.8;
                e.preventDefault();
            }
        }, { passive: false });
    }
});