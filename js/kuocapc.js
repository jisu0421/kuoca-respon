$(function () {

    // ================= Header : 햄버거 메뉴 =================
    $(".pc-menu-btn").on("click", function () {

        $(this).toggleClass("active");
        $(".pc-menu-overlay").toggleClass("active");
        $(".pc-side-menu").toggleClass("active");

    });


    // ================= Header : 메뉴 닫기 =================
    $(".pc-menu-overlay").on("click", function () {

        $(".pc-menu-btn").removeClass("active");
        $(".pc-menu-overlay").removeClass("active");
        $(".pc-side-menu").removeClass("active");

    });


    // ================= Header : 스크롤 =================
    function headerScroll() {

        if ($(window).scrollTop() > 80) {
            $(".pc-header").addClass("scrolled");
        } else {
            $(".pc-header").removeClass("scrolled");
        }

    }


    // ================= Hero Slider =================
    var current = 0;
    var timer = null;

    var slides = $(".pc-hero-slide");
    var dots = $(".pc-hero-pagination span");
    var prevBtn = $(".pc-hero-prev");
    var nextBtn = $(".pc-hero-next");
    var slideLength = slides.length;


    function showSlide(index) {

        if (slideLength <= 0) {
            return;
        }

        if (index < 0) {
            index = slideLength - 1;
        }

        if (index >= slideLength) {
            index = 0;
        }

        current = index;

        slides.removeClass("active");
        dots.removeClass("active");

        slides.eq(current).addClass("active");
        dots.eq(current).addClass("active");

    }


    function nextSlide() {

        showSlide(current + 1);

    }


    function prevSlide() {

        showSlide(current - 1);

    }


    function startTimer() {

        clearInterval(timer);

        if (slideLength > 1) {
            timer = setInterval(function () {
                nextSlide();
            }, 5000);
        }

    }


    function stopTimer() {

        clearInterval(timer);

    }


    if (slideLength > 0) {

        showSlide(0);
        startTimer();

    }


    // dot 클릭
    dots.on("click", function () {

        var dotIndex = $(this).index();

        showSlide(dotIndex);
        startTimer();

    });


    // 다음 버튼 클릭
    nextBtn.on("click", function (e) {

        e.preventDefault();

        nextSlide();
        startTimer();

    });


    // 이전 버튼 클릭
    prevBtn.on("click", function (e) {

        e.preventDefault();

        prevSlide();
        startTimer();

    });


    // 마우스 올리면 슬라이드 멈춤
    $(".pc-hero-slider").on("mouseenter", function () {

        stopTimer();

    });


    // 마우스 떼면 다시 자동 재생
    $(".pc-hero-slider").on("mouseleave", function () {

        startTimer();

    });


    // ================= Intro : Sticky 상태 클래스 =================
    function introMotion() {

        var intro = $(".pc-intro");

        if (intro.length <= 0) {
            return;
        }

        if ($(window).scrollTop() > 5) {

            intro.addClass("show");
            $(".pc-hero-slider").addClass("dimmed");

        } else {

            intro.removeClass("show");
            $(".pc-hero-slider").removeClass("dimmed");

        }

    }


    // ================= Intro : 스크롤 시 스르륵 자동으로 덮는 스냅 모션 =================
    var isSnapping = false;

    function snapTo(target) {

        isSnapping = true;

        $("html, body").stop(true).animate(
            { scrollTop: target },
            900,
            "swing",
            function () {
                isSnapping = false;
            }
        );

    }


    function onHeroWheel(e) {

        if(window.innerWidth < 1024){
            return;
        }

        var vh = $(window).height();
        var top = $(window).scrollTop();
        var delta = e.deltaY;

        // 스냅 애니메이션 중에는 추가 스크롤 차단
        if (isSnapping) {
            e.preventDefault();
            return;
        }

        // 히어로 화면에서 아래로 스크롤 → 인트로가 스르륵 올라와 덮음
        if (delta > 0 && top < vh - 5) {
            e.preventDefault();
            snapTo(vh);
            return;
        }

        // 인트로가 덮인 구간에서 위로 스크롤 → 다시 히어로로 복귀
        if (delta < 0 && top > 5 && top < vh) {
            e.preventDefault();
            snapTo(0);
        }

    }

    // preventDefault 가 동작하도록 passive: false 로 직접 등록
        if (window.innerWidth >= 1024) {
            window.addEventListener("wheel", onHeroWheel, { passive: false });
        }


    // ================= Video : PLAY / PAUSE =================
    var introVideo = $(".pc-intro-video video").get(0);

    $(".pc-video-play").on("click", function () {

        if (introVideo) {
            introVideo.play();
        }

        $(".pc-video-play").addClass("active");
        $(".pc-video-pause").removeClass("active");

    });


    $(".pc-video-pause").on("click", function () {

        if (introVideo) {
            introVideo.pause();
        }

        $(".pc-video-pause").addClass("active");
        $(".pc-video-play").removeClass("active");

    });


    // ================= 초기 실행 =================
    headerScroll();
    introMotion();


    // ================= Scroll / Resize =================
    $(window).on("scroll", function () {

        headerScroll();
        introMotion();

    });


    $(window).on("resize", function () {

        introMotion();

    });

});
