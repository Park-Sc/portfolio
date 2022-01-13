'use strict'


// 스크롤하면 MENU가 애니메이션됨. 

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
console.log(navbarHeight);
//선택자의 값을 받아 오는데 값이 커지거나 작아도 그 고유의 값이 아닌 바뀝 값을 가져옴.
//값을 받아온 이유는 이 값만큼 스크롤 하면 변환되게 끔 하기위해서.
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark')
  } else {
    navbar.classList.remove('navbar--dark');
  }
});
// 만약에 스크롤 높이값이 nav 높이값보다 높으면 클래스추가, 적으면 클래스 삭제하게 하여 애니메이션 효과를 주면 됨.

// 토글되는 자바스크립트. 클릭 시 open 클래스가 토글됨.(모바일 햄버그 버튼)
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn')
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open')
});


const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target; // consolde 찍어보면 각 li의 클래스값이 나옴. 
  const link = target.dataset.link; // li의 데이더 값을 반출함. dataset은 맵속성으로 등록됨
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open') // 모바일 상태일 때 링크 이동 시 행버그 메뉴가 사라짐.
  scrollIntoView(link) //scrollIntoView는 특정위치로 스크롤 이동하는 함수
});

// contact 버튼을 눌렀을 때 스크롤 이동하는 함수
const homeContactBtn = document.querySelector('.home__contact');
const home = document.querySelector('.home__container');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact')
});

// 스크롤 했을 때 home의 화면이 점차 흐려짐
const homeHeight = home.getBoundingClientRect().height; //home 보여지고 있는 높이값.
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
})

// 화살표 버튼 누르면 위로 올라감.
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) { // 처음부터 나와있지 ㅇ낳고 아까 이용한 변수를 활용하여, 스크롤 할 시 화살표 나오게끔 
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

arrowUp.addEventListener('click', () => {
  scrollIntoView('#home')
});

//겹치는 함수가 많아 셀렉터에 맞게 요소를 찾은 다음 스크롤을 스무스하게 이동하게 해줌.

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: "smooth"
  });
};

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  console.log(e.target)
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter; //parentNode현재 노드의 부모 , 만약의 스판이 타겟으로 잡혔을 때 스판의 부모인 버튼의 데이터 값을 받아옴.
  if (filter == null) {
    return
  } //필터값이 없으면 그대로 리턴~

  //버튼을 활성화 했을 때 효과
  const active = document.querySelector('.category__btn.selected')
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode
  //e.target의 노드네임이 버튼이면 e.target을 쓰고 아니면 e.target의 parentNode를 쓰겠다. (자바스크립트 문법)
  target.classList.add('selected');


  // 버튼을 활성화 했을 때 프로젝트의 애니메이션 효과.
  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => { //.project요소를 배열형태로 받아옴.
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});
