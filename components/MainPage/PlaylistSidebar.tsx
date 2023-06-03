import Image from "next/image"
import { IoArrowForward } from "react-icons/io5"
import SongCard from "../reusable/SongCard"
import { useWindowSize } from "@component/lib/window"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FastAverageColor } from 'fast-average-color';
import { useRouter } from "next/router";

export default function PlaylistSidebar({playlist}) {
    const windowSize = useWindowSize()
    const [isSticky, setIsSticky] = useState(false);
    const router = useRouter();
    const parentRef = useRef(null);
    const comp = useRef(); // create a ref for the root level element (for scoping)
    const parentDivRef = useRef<any>(null);
    const smallTopDivRef = useRef<any>(null);
    const bigTopRef = useRef<any>(null);
    const bigTopImageRef = useRef<any>(null);
    const playlistTextRef = useRef<any>(null);
    const playlistHeaderRef = useRef<any>(null);
    const playlistSmallTextRef = useRef<any>(null);
    const smallTopTextRef = useRef<any>(null);
    const contentRef = useRef<any>(null);
    const [bannerColor, setBannerColor] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    gsap.registerPlugin(ScrollTrigger);
   
 
    // TODO:
    // Decrease size of image then make it slide out to left
    // Caption text to disappear opacity to 0
    // Shift the text to the left
  useLayoutEffect(()=>{

    const fac = new FastAverageColor();
    const container = document.querySelector('#playlistImage')!;

    if(bigTopImageRef.current) {
      fac.getColorAsync(bigTopImageRef.current.currentSrc)
      .then(color => {
          console.log(color.rgba)
          
          document.getElementById("smallScrollTop")!.style.background = color.rgba.replace(/[\d.]+\)$/g, '0.65)')
      })
      .catch(e => {
          console.log(e);
      });
    }
    
  }, [router.pathname])
    useLayoutEffect(()=>{
      const smallTop = document.querySelector('#smallScrollTop')
      const bigTop: HTMLElement | null = document.getElementById('playlistTop')
      const parentContainer: HTMLElement | null = document.getElementById('sidebarContainer')
      const bigTopImage = document.querySelector('#playlistTop Image')
      
      const parentDivElement = parentDivRef.current;
      const bigTopElement = bigTopRef.current;
      const bigTopImgElement = bigTopImageRef.current;
      const smallTopDivElement = smallTopDivRef.current;
      const playlistTextElement = playlistTextRef.current;
      const smallTopText = smallTopTextRef.current;
      const contentElement = contentRef.current
      const htag = playlistHeaderRef.current
      const ptag = playlistSmallTextRef.current
      const dist = contentElement.offsetWidth - htag.offsetWidth



      document.getElementById("smallScrollTop")!.style.width = `${contentElement.offsetWidth}px`;
      // document.getElementById("playlistTop")!.style.width = `${contentElement.offsetWidth}px`;
      if(contentElement && bigTopElement) {
        document.getElementById("sidebarContainer")?.addEventListener("scroll", function() {
          const initialSidebarTop = parentDivElement.getBoundingClientRect().top;
          let actualSelectedElTop = contentElement.getBoundingClientRect().top;
          let selectedElPosition = (actualSelectedElTop - initialSidebarTop);
          console.log(selectedElPosition)
          // document.getElementById("playlistTop")!.style.height = `${selectedElPosition}px`;
          // document.getElementById("playlistTop")!.style.width = `${contentElement.offsetWidth}px`;
          document.getElementById("smallScrollTop")!.style.width = `${contentElement.offsetWidth}px`;
        })
      }
      const ctx = gsap.context((self) => {
        gsap.from(smallTopDivElement, {
          opacity: 0,
          x: 0,
        });
        gsap.from(smallTopDivElement.children, {
          opacity: 0
        });
        
        // gsap.to(bigTopElement, {
        //   ease: "none",
        //   opacity: 0,
        //   duration: 1000,
        //   scrollTrigger: {
        //     trigger: "#playlistTop",
        //     start: "top top",
        //     end: '+=50',
        //     scrub: true,
        //     scroller: "#sidebarContainer",
        //   },
        // });
       
        // gsap.to(playlistTextElement, {
        //   ease: "none",
        //   x: -60,
        //   duration: 1000,
        //   scrollTrigger: {
        //     trigger: "#sidebarContainer",
        //     start: "top top",
        //     end: '+=400',
        //     scrub: true,
        //     scroller: "#sidebarContainer",
        //   },
        // });
        // gsap.to(htag, {
        //   ease: "none",
        //   x: 0,
        //   duration: 1000,
        //   scrollTrigger: {
        //     trigger: "#sidebarContainer",
        //     start: "top top",
        //     end: '+=400',
        //     scrub: true,
        //     scroller: "#sidebarContainer",
        //   },
        // });
        gsap.to(smallTopDivElement, {
          opacity: 1,
          ease: "none",
          duration: 1000,
          pointerEvents: "auto",
          scrollTrigger: {
            trigger: "#sidebarContainer",
            start: "top+=50",
            end: '+=50',
            scrub: true,
            scroller: "#sidebarContainer",
          },
        });
        gsap.to(smallTopDivElement.children, {
          opacity: 1,
          ease: "none",
          duration: 1000,
          scrollTrigger: {
            trigger: "#sidebarContainer",
            start: "top+=150",
            end: '+=50',
            scrub: true,
            scroller: "#sidebarContainer",
          },
        });
        // gsap.to(smallTopDivElement, {
        //   opacity: 1,
        //   ease: "none",
        //   duration: 4000,
        //   scrollTrigger: {
        //     trigger: "#sidebarContainer",
        //     start: bigTop!.clientHeight,
        //     end: '+=200',
        //     scrub: true,
        //     scroller: "#sidebarContainer",
        //     markers: true
        //   },
        // });
      })
      return () => ctx.revert(); // cleanup
    })

  
    if(windowSize.width < 0) {
        return (
            <div id="sidebarContainer" className="bg-[var(--bg2)] flex  flex-col gap-6 h-full overflow-y-scroll rounded-md max-w-md w-[50rem] pr-4 fixed z-40">
                <div ref={bigTopRef} id="playlistTop" className="flex pl-2 gap-6 items-start">
                  <div className="p-2 bg-[var(--bg3)] cursor-pointer transition-all ease-in-out hover:brightness-200 absolute rounded-full right-0 top-0 rotate-180">
                    <IoArrowForward className="text-lg text-gray-300"></IoArrowForward>
                  </div>
                  <Image 
                  ref={bigTopImageRef}
                    unoptimized={true}
                    loader={()=>playlist.images?.[0].url}
                    src={playlist.images?.[0].url} width={120} height={120}  alt="Song Image" className="max-md:hidden shadow-md w-18 h-18 rounded-md" 
                    priority/>
                  <div className="line-clamp-2 text-ellipse  w-full pr-12 text-start flex flex-col gap-2">
                    <h1 className="text-[1.8rem] font-semibold leading-[2rem] ">
                        {playlist.name}
                    </h1>
                    <p className="text-gray-300">
                      {playlist.owner.display_name}
                    </p>
                  </div>
                </div>
                <hr className="opacity-10" />
                <div className="mt-[20rem]">
                {playlist.tracks.items.map((item, index) => (
                    <SongCard song={item.track} key={index} />
                  ))}
                </div>
            </div>
      )
    } else {
        return (
            <div ref={parentDivRef} id="sidebarContainer"  className={`bg-[var(--bg1)]  flex flex-col h-full overflow-y-scroll rounded-md max-w-md w-[50rem] pr-4 relative`}>
                <div
                  ref={bigTopRef}
                  // id="playlistTop"  className={`flex h-fit pl-2 overflow-hidden gap-6 items-start fixed bg-[var(--bg1)] py-4 rounded-md z-20 `}>
                  id="playlistTop"  className={`flex h-fit pl-2  gap-6 items-start py-4 rounded-md z-30 `}>
                  <div className="p-2 bg-[var(--bg3)] cursor-pointer transition-all ease-in-out hover:brightness-200 absolute rounded-full right-4 top-4 rotate-180">
                    <IoArrowForward className="text-lg text-gray-300"></IoArrowForward>
                  </div>
                  <Image 
                    onLoad={() => setIsLoaded(true)}
                  ref={bigTopImageRef}
                  id="playlistImage"
                    unoptimized={true}
                    loader={()=>playlist.images?.[0].url}
                    src={playlist.images?.[0].url} width={120} height={120}  alt="Song Image" className="transition-all ease-in-out max-md:hidden shadow-md w-18 h-18 rounded-md" 
                    priority/>
                  <div
                  ref={playlistTextRef}
                    id="playlistText"
                  className="line-clamp-2 text-ellipse  w-full pr-12 text-start flex flex-col gap-2">
                    <h1
                    ref={playlistHeaderRef}
                    className="text-[1.8rem] font-semibold leading-[2rem] ">
                        {playlist.name}
                    </h1>
                    <p 
                    className="text-gray-300">
                      {playlist.owner.display_name}
                    </p>
                  </div>
                </div>

                <div ref={smallTopDivRef} id="smallScrollTop" className={`opacity-0 pointer-events-none overflow-hidden flex pl-2 gap-6 items-start fixed py-4 rounded-md z-30`}>
                  <div ref={smallTopTextRef} className="p-2 bg-[var(--bg3)] cursor-pointer transition-all ease-in-out hover:brightness-200 absolute rounded-full right-4 top-[50%] translate-y-[-50%] rotate-180">
                    <IoArrowForward className="text-lg text-gray-300"></IoArrowForward>
                  </div>
                  <div
                    ref={playlistSmallTextRef}
                    id="playlistText"
                  className="line-clamp-2 pl-4 text-ellipse  w-full pr-12 text-start flex flex-col gap-2">
                    <h1 className="text-[1rem] font-semibold leading-[2rem] ">
                        {playlist.name}
                    </h1>
                  </div>
                </div>

                <div id="sidebarContent" className="z-10 h-fit" ref={contentRef}>
                  <hr className="opacity-10" />
                  <div className="py-4">
                  {playlist.tracks.items.map((item, index) => (
                      <SongCard song={item.track} key={index} />
                    ))}
                  </div>
                </div>
                
            </div>
      )
    }
    
}