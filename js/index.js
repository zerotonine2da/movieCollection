const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWVjNTMwN2RhYTY5ZWY3NzgyODAzZGZkMDBkNWI5ZCIsInN1YiI6IjY1MmYyNjQ1MDI0ZWM4MDExZTM1YjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oG7BkcuZXzeZvbHcn2q3I4bFSVE52PlLkaudD3_EuSg',
    },
};

let data = {};
//즉시실행함수
(async function () {
    try {
        //데이터 가져오기
        const result1 = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?language=ko-US&page=1',
            options
        ).then((response) => response.json()); //response: fetch 결과

        data = result1.results;
        drawCard(result1.results);
        displayShow();
        review();
    } catch (error) {
        console.error(error);
    }
})();

/*
fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    data = response.results;
    drawCard(data);
  })
  .catch((err) => console.error(err));

*/

function drawCard(sortType) {
    //빈화면 만들기
    document.querySelector('#movies').innerHTML = '';

    sortType.forEach((movie) => {
        const template = `
                          <div class = "movie" id = "${movie.id}" >
                            <img src ="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt=""/>
                            <div class = "text">
                              <h3 class = "title">${movie.title}</h3>
                            </div>
                              <button class="detailpage_btn">영화 상세보기</button>
                            </div>
                            
                            <div class="modal" id = "${movie.id}" style="display: none;">
                              <div class="popup">
                              <img src ="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt=""/>
                              <div class ="moviemodal">
                              <h3 class="movie_t">${movie.title}</h3>
                              <div class ="moivedate">개봉날짜</div>
                                <div class="desc">${movie.overview}</div>
                                <div class= movie_score>평점 : 0.0 </div>
                                </div>
                                <div class = review_title><리뷰창></div>
                                <div class =movie_review>
                                <div class = inputtext>
                                닉네임 입력: <input class ="reviewer" type="text"placeholder="작성자 입력요망"/>
                                </div>
                                <textarea class = review_area placeholder="리뷰내용을 작성해주시오"></textarea>
                                <div class = "pwdarea">
                                비밀번호 : <input class ="review_pw" type="password" name="pass">
                                <button class="inputvalue_review">입력</button>
                                </div>
                                </div>
                                <div class = review_title><작성된 댓글창></div>
                                
                                <div class =movie_review2>
                                
                                </div>
                                <button class="close">X</button>
                              </div>
                            </div>`;
        document.querySelector('#movies').insertAdjacentHTML('beforeend', template);
    });
    displayHide();
}

// 카드를 누르면 id 뜨도록
function seeid(clicked_id) {
    alert(`영화의 ID는 ${clicked_id}입니다.`);
}

// 검색 버튼
const searchButton = document.getElementById('searchButton');

// 검색 함수
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const inputvalue = searchInput.value.toLowerCase();
    console.log(inputvalue);

    const movieName = document.querySelectorAll('h3.title');
    console.log(movieName);

    movieName.forEach((name) => {
        if (name.textContent.toLowerCase().includes(inputvalue)) {
            name.parentNode.parentNode.style.display = 'block';
        } else {
            name.parentNode.parentNode.style.display = 'none';
        }
    });
}
// 검색 버튼 클릭 시 검색 시작하는 이벤트
searchButton.addEventListener('click', performSearch);

// 엔터 키를 누를 때도 검색
document.getElementById('searchInput').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function displayShow() {
    document.querySelectorAll('.detailpage_btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal');
            modals[index].style.display = 'flex';
        });
    });
}

function review() {
    const inputvalue_review = document.querySelectorAll('.inputvalue_review');
    const $reviewer = document.querySelectorAll('.reviewer');
    const $reviewvlaue = document.querySelectorAll('.review_area');
    const $review_pw = document.querySelectorAll('.review_pw');
    const $getvaluee_review = document.querySelectorAll('.getvaluee_review');


    inputvalue_review.forEach((reviewBtn, index) => {
        reviewBtn.addEventListener('click', () => {
            let reviewer = $reviewer[index].value;
            let reviewvlaue = $reviewvlaue[index].value;
            let review_pw = $review_pw[index].value;

            localSetitem(reviewer, reviewvlaue);
            addReview(reviewer, reviewvlaue);
        });
    });
    //스토리지에 저장된 아이템을 불러온다.
    $getvaluee_review.forEach((getbtn, index) => {
        getbtn.addEventListener('click', () => {
            let reviewer = $reviewer[index].value;
            let reviewvlaue = $reviewvlaue[index].value;
            localGetitem(reviewer, reviewvlaue);
            addReviewToTemplate(reviewer, reviewvlaue);
        });
    });
}

function displayHide() {
    document.querySelectorAll('.close').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal');
            modals[index].style.display = 'none';
        });
    });
}


//로컬스토리지에다가 저장
const localSetitem = (reviewer, reviewvlaue) => {
    localStorage.setItem(reviewer, reviewvlaue);
};
 

//로컬스토리지 저장된 key value값 가져오기
const localGetitem = (reviewer, reviewvlaue) => {
    console.log(reviewer, reviewvlaue);
    localStorage.getItem(reviewer, reviewvlaue);
};
//[정렬]
document.getElementById('orderType').addEventListener('change', function (event) {
    const orderType = document.getElementById('orderType');
    const selectType = orderType.options[orderType.selectedIndex].value;
    console.log(selectType);

    if (selectType === '1') {
        //선택 (원래대로)
        drawCard(data);
    } else if (selectType === '2') {
        //평점순
        voteAverage();
    } else if (selectType === '3') {
        //제목순
        orderABC();
    } else if (selectType === '4') {
        //개봉일순
        releaseDate();
    }
});

//[정렬1] 평점순
function voteAverage() {
    let sortVoteRate = data
        .map((v) => v)
        .sort(function (a, b) {
            return b.vote_average - a.vote_average;
        });
    drawCard(sortVoteRate);
}

//[정렬2] 제목순 (가나다순)
function orderABC() {
    let sortAZ = data
        .map((v) => v)
        .sort(function (a, b) {
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
        });

    drawCard(sortAZ);
}

//[정렬3]개봉일순
function releaseDate() {
    console.log(data);

    let sortVoteRate = data
        .map((v) => v)
        .sort(function (a, b) {
            return b.release_date.replaceAll('-', '') - a.release_date.replaceAll('-', '');
        });

    drawCard(sortVoteRate);
}



// 리뷰를 템플릿에 추가하는 함수
function addReviewToTemplate(reviewer, reviewvlaue) {
    // 템플릿에 리뷰 추가
    const reviewTemplate = `
    <div class="review">
      <div class="reviewer-name">${reviewer}</div>
      <div class="review-text">${reviewvlaue}</div>
    </div>
  `;

    // 템플릿을 어느 요소에 추가할지 지정한 후 추가
    const reviewsContainer = document.querySelector('.movie_review2');
    reviewsContainer.innerHTML += reviewTemplate;
}

// 리뷰 작성 버튼 클릭 시 호출되는 함수
function addReview(index) {
    const reviewer = $reviewer[index].value;
    const reviewvlaue = $reviewvlaue[index].value;

    // 데이터를 로컬 스토리지에 저장
    localSetitem(reviewer, reviewvlaue);

    // 리뷰 템플릿에 추가
    addReviewToTemplate(reviewer, reviewvlaue);
}

// 로컬 스토리지에서 저장된 리뷰를 불러와 템플릿에 추가하는 함수
function loadReviews() {
    for (let i = 0; i < localStorage.length; i++) {
        const reviewer = localStorage.key(i);
        const reviewvlaue = localStorage.getItem(reviewer);
        addReviewToTemplate(reviewer, reviewvlaue);
    }
}

// 페이지 로드 시 저장된 리뷰 불러오기
window.addEventListener('load', loadReviews);
