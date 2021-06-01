//animation on add button
const tl=gsap.timeline({paused : true});
//animations
tl.to("#icon",{
    duration: 0.3,
    rotation : 360,
    ease : "power4.out",
    color : "white"
})
tl.to(".addlabel",{
    duration : 0.3,
    delay : -0.3,
    backgroundColor: "grey",
    border : 0,
    ease : "power3.out"
})
//timelines

document.querySelector(".addlabel").addEventListener('mouseover',(event)=>{
    event.preventDefault();
    tl.play();
});

document.querySelector(".addlabel").addEventListener('click',(event)=>{
    event.preventDefault();
    tl.play();
});

document.querySelector(".addlabel").addEventListener('mouseout',(event)=>{
    event.preventDefault();
    tl.reverse();
})
