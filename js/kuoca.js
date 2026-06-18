 //상단바 스크롤 
$(window).on("scroll", function(){
    if($(window).scrollTop() > 80){
        $(".header").addClass("scrolled");
    }else{
        $(".header").removeClass("scrolled");
    }
});

//배너 자동움직임
$(function(){
    let current=0;
    const slides = $(".slide");
    const total = slides.length;

    setInterval(function(){
        slides.eq(current).removeClass("active");
        current= (current + 1) % total;
        slides.eq(current).addClass("active");
    }, 4000);
});



// ===============================
// Category : 카테고리 필터 + 전체보기 통제
// 모바일 All : 4개
// 태블릿 All : 6개
// ===============================
$(function(){

    // 현재 선택된 카테고리 저장
    var currentCategory = "all";

    // 전체보기 상태 저장
    var expanded = false;


    // 화면 크기에 따라 보여줄 상품 개수 계산
    function getLimit(){

        if(window.innerWidth >= 768){
            return 6; // 태블릿: 6개
        }else{
            return 4; // 모바일: 4개
        }

    }


    // 상품 필터 적용 함수
    function applyFilter(category, isExpanded){

        var $cards = $(".product-card");
        var limit = getLimit();

        // All 카테고리
        if(category === "all"){

            $(".more").show();

            // 전체보기 상태일 때
            if(isExpanded){
                $cards.show();
            }

            // 접힌 상태일 때
            else{
                $cards.hide();
                $cards.slice(0, limit).show();
            }

        }

        // All이 아닌 다른 카테고리
        else{

            $(".more").hide();

            $cards.hide();
            $(".product-card[data-category='" + category + "']").show();

        }

    }


    // 카테고리 버튼 클릭
    $(".category-list button").on("click", function(){

        currentCategory = $(this).attr("data-category");
        expanded = false;

        $(".category-list li").removeClass("active");
        $(this).parent().addClass("active");

        $(".product-list").removeClass("show-all");
        $(".view-more").text("전체보기");

        applyFilter(currentCategory, expanded);

    });


    // 전체보기 / 접기 버튼 클릭
    $(".view-more").on("click", function(){

        // All 카테고리일 때만 작동
        if(currentCategory !== "all"){
            return;
        }

        expanded = !expanded;

        $(".product-list").toggleClass("show-all", expanded);
        $(".view-more").text(expanded ? "접기" : "전체보기");

        applyFilter(currentCategory, expanded);

    });


    // 화면 크기 변경 시 다시 계산
    // 모바일 → 태블릿으로 바뀌면 4개에서 6개로 다시 적용됨
    $(window).on("resize", function(){

        applyFilter(currentCategory, expanded);

    });


    // 페이지 처음 로드 시 All 카테고리 접힘 상태로 시작
    applyFilter(currentCategory, expanded);

});



// ===============================
// Bottom Menu : 하단바 스크롤
// ===============================
$(window).on("scroll", function(){

    if($(window).scrollTop() > 80){
        $(".b-menu").addClass("scrolled");
    }else{
        $(".b-menu").removeClass("scrolled");
    }

});


 //하단바 스크롤 
$(window).on("scroll", function(){
    const scroll = $(window).scrollTop() > 80;

    if(scroll > 0){
        $(".b-menu").addClass("scrolled");
    }else{
        $(".b-menu").removeClass("scrolled");
    }
});

