import styles from '../styles/Custom.module.scss'



export const SkeletonCard = () => {
    return (
      <>
        {/* <div className={`${styles.isLoading} ${styles.card} relative rounded-md bg-[#010504] h-[100%]`} >
            <div className={'relative h-fit rounded-md flex-column p-5 h-[100%]'}  >
                <div className={styles.image}/>
                <h1 ></h1>
            </div>
        </div> */}
        
        <div className={`${styles.isLoading} flex cursor-pointer hover:scale-[1.01] transition-all grid-cols-3 bg-[#282828] p-4 rounded-lg h-[9rem] overflow-hidden w-full gap-4`} >
          <div className={`h-[7rem] w-[7rem] overflow-hidden`}/>
          </div>
          <div className={'w-full flex-1 h-[7rem]'}  >
        </div>
        {/* <Link href={`/playlist/${playlist.id}`} className="flex cursor-pointer hover:scale-[1.01] transition-all grid-cols-3 bg-[#282828] p-4 rounded-lg h-[9rem] overflow-hidden w-full gap-4">
        <div className="h-[7rem] w-[7rem] overflow-hidden">
          <Image loader={() => playlist?.images?.[0]?.url} src={playlist?.images?.[0]?.url} width={"120"} height={"120"} alt="Song Image" className="h-full rounded-lg w-auto object-cover bg-cover" />
        </div>
        <div className="w-full flex-1">
          <h2 className="text-lg font-semibold mb-2 w-full line-clamp-2 text-ellipse">{playlist.name}</h2>
          <p className="text-[#A9A9A9] pointer-events-none line-clamp-2 text-ellipse">
            {playlist?.description ? (
              <>
              {parse(playlist?.description)}
              </>
            ) : (
              <>
              by {playlist?.owner.display_name}
              </>
            )}</p>
        </div>
      </Link> */}
      </>
    );
  };