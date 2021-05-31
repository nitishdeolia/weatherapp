gsap.from("p.toLeft",{
    duration : 1,
    opacity : 0,
    x : 50,
    ease: "power4.out"
})

gsap.from("p.toRight",{
    duration : 1,
    opacity : 0,
    x : -50,
    ease: "power4.out"
})

// animation for mouse over action and mouse out action for first image

document.querySelector("#imgfirst").addEventListener('mouseover',(event) =>{
    gsap.to(".about:nth-child(1)",{
        duration : 0.5,
        borderWidth : "1rem",
        ease : "back.out(1.7)"
    })
});



document.querySelector("#imgfirst").addEventListener('mouseout',(event)=>{
    gsap.to(".about:nth-child(1)",{
        duration : 0.5,
        borderWidth : "0.5rem",
        ease : "power4.out"
    })
});

// animation for mouse in action and mouse out action for second image

document.querySelector("#right").addEventListener('mouseover',(event) =>{
    gsap.to(".about:nth-child(2)",{
        duration : 0.5,
        borderWidth : "1rem",
        ease : "back.out(1.7)"
    })
});

document.querySelector("#right").addEventListener('mouseout',(event)=>{
    gsap.to(".about:nth-child(2)",{
        duration : 0.5,
        borderWidth : "0.5rem",
        ease : "power4.out"
    })
});

// animation for mouse in action and mouse out action for third image

document.querySelector("#imglast").addEventListener('mouseover',(event) =>{
    gsap.to(".about:nth-child(3)",{
        duration : 0.5,
        borderWidth : "1rem",
        ease : "back.out(1.7)"
    })
});

document.querySelector("#imglast").addEventListener('mouseout',(event)=>{
    gsap.to(".about:nth-child(3)",{
        duration : 0.5,
        borderWidth : "0.5rem",
        ease : "power4.out"
    })
});