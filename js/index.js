const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWVjNTMwN2RhYTY5ZWY3NzgyODAzZGZkMDBkNWI5ZCIsInN1YiI6IjY1MmYyNjQ1MDI0ZWM4MDExZTM1YjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oG7BkcuZXzeZvbHcn2q3I4bFSVE52PlLkaudD3_EuSg",
  },
};

let data = {};
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

function drawCard(sortType) {
  //빈화면 만들기
  document.querySelector("#movies").innerHTML = "";

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
                              <div class ="moivedate">개봉날짜 : ${movie.release_date}</div>
                                <div class="desc">${movie.overview}</div>
                                <div class= movie_score>평점 : ${movie.vote_average} </div>
                                </div>
                                <div class = review_title>리뷰창</div>
                                <div class =movie_review>
                                <form>
                                <div class = inputtext>
                                닉네임 입력: <input required class ="reviewer" type="text"placeholder="닉네임을 입력해주세요."/>
                                </div>
                                <textarea required minlength = "2" maxlength = "200" class = review_area placeholder="리뷰내용을 작성해주세요."></textarea>
                                <div class = "pwdarea">
                                비밀번호 : <input required minlength = "3" maxlength = "5" class ="review_pw" type="password" name="pass">
                                <button class="inputvalue_review">입력</button>
                                </div>
                                </form>
                                </div>
                                <div class = review_title><작성된 댓글창></div>
                                <button class="getvaluee_review">작성된 리뷰 불러오기</button>
                                <div class =movie_review2>
                                
                                </div>
                                <button class="close">X</button>
                              </div>
                            </div>`;
    document.querySelector("#movies").insertAdjacentHTML("beforeend", template);
  });
  displayShow();
  displayHide();
}

// 카드를 누르면 id 뜨도록
function seeid(clicked_id) {
  alert(`영화의 ID는 ${clicked_id}입니다.`);
}

// 검색 버튼
const searchButton = document.getElementById("searchButton");

// 검색 함수
function performSearch() {
  const searchInput = document.getElementById("searchInput");
  const inputvalue = searchInput.value.toLowerCase();
  console.log(inputvalue);

  if (searchInput.value === "") {
    alert("검색어를 입력해주세요.");
  }

  const movieName = document.querySelectorAll("h3.title");
  console.log(movieName);

  movieName.forEach((name) => {
    if (name.textContent.toLowerCase().includes(inputvalue)) {
      name.parentNode.parentNode.style.display = "block";
    } else {
      name.parentNode.parentNode.style.display = "none";
    }
  });
}
// 검색 버튼 클릭 시 검색 시작하는 이벤트
searchButton.addEventListener("click", performSearch);

// 엔터 키를 누를 때도 검색
document
  .getElementById("searchInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

function displayShow() {
  document.querySelectorAll(".detailpage_btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const modals = document.querySelectorAll(".modal");
      modals[index].style.display = "flex";
    });
  });

  const inputvalue_review = document.querySelectorAll(".inputvalue_review");
  const $reviewer = document.querySelectorAll(".reviewer");
  const $reviewvlaue = document.querySelectorAll(".review_area");
  const $review_pw = document.querySelectorAll(".review_pw");

  inputvalue_review.forEach((reviewBtn, index) => {
    reviewBtn.addEventListener("click", () => {
      let reviewer = $reviewer[index].value;
      let reviewvlaue = $reviewvlaue[index].value;
      let review_pw = $review_pw[index].value;
      let movieName = document.querySelectorAll("h3.title")[index].innerHTML;

      console.log(movieName);

      localGetitem(`영화 제목 : ${movieName} 닉네임 :` + reviewer, reviewvlaue);
    });
  });
}

function displayHide() {
  document.querySelectorAll(".close").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const modals = document.querySelectorAll(".modal");
      modals[index].style.display = "none";
    });
  });
}

function windowClickHide() {
  window.addEventListener("click", function () {
    displayHide();
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
document
  .getElementById("orderType")
  .addEventListener("change", function (event) {
    const orderType = document.getElementById("orderType");
    const selectType = orderType.options[orderType.selectedIndex].value;
    console.log(selectType);

    if (selectType === "1") {
      //선택 (원래대로)
      drawCard(data);
    } else if (selectType === "2") {
      //평점순
      voteAverage();
    } else if (selectType === "3") {
      //제목순
      orderABC();
    } else if (selectType === "4") {
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
      return (
        b.release_date.replaceAll("-", "") - a.release_date.replaceAll("-", "")
      );
    });

  drawCard(sortVoteRate);
}
