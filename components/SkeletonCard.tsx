import styles from '../styles/Custom.module.scss'



export const SkeletonCard = () => {
    return (
      <>
        <div className={`${styles.isLoading} ${styles.card} relative rounded-md bg-[#010504] h-[100%]`} >
            <div className={'relative h-fit rounded-md flex-column p-5 h-[100%]'}  >
                <div className={styles.image}/>
                <h1 ></h1>
            </div>
        </div>
      </>
    );
  };