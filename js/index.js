const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWVjNTMwN2RhYTY5ZWY3NzgyODAzZGZkMDBkNWI5ZCIsInN1YiI6IjY1MmYyNjQ1MDI0ZWM4MDExZTM1YjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oG7BkcuZXzeZvbHcn2q3I4bFSVE52PlLkaudD3_EuSg",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    response.results.forEach((movie) => {
      const template = `<div class = "movie" id = "${movie.id}" onclick ='seeid(this.id)'>
                            <img src ="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt=""/>
                            <div class = "text">
                            <h3 class = "title">${movie.title}</h3>
                            </div>
                            <button class="detailpage_btn">영화 상세보기</button>
                            </div>`;
      document
        .querySelector("#movies")
        .insertAdjacentHTML("beforeend", template);
    });
  })
  .catch((err) => console.error(err));

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



document.getElementById("close").addEventListener('click',function(){
  document.querySelector(".modal").style.display = 'none';
})

document.querySelector(".movie").addEventListener('click',function(){
  document.querySelector(".modal").style.display = 'block';
})
