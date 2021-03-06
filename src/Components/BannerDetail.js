import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { exportComponentAsJPEG } from 'react-component-export-image';


import styles from './BannerDetail.module.css';

const BannerDetail = (props) => {
    const history = useHistory();
    const params = useParams();
    const [bannerDetail, setBannerDetail] = useState({});
    const componentRef = useRef();

    useEffect(() => {
        const fetchBanner = async () => {
            const response = await fetch(`https://ffw-assignment-default-rtdb.europe-west1.firebasedatabase.app/banners/${params.id}.json`);
            const data = await response.json();
            console.log(data)
            setBannerDetail(data);
        }
        console.log('useEffect run in bannerDetail')
        fetchBanner();
    },[params,bannerDetail])


    const onEditHandler = (e) => {
        e.preventDefault();
        history.push(`/banners/${params.id}/edit`)
    }
    const onDeleteHandler = (e) => {
        e.preventDefault();
        fetch(`https://ffw-assignment-default-rtdb.europe-west1.firebasedatabase.app/banners/${params.id}.json`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
              }
        }).finally(() => {
            history.replace('/banners');
        })

        
    }

    return (
        <section className={styles.detail} >
            <div ref={componentRef}>
            <div className={styles['image-container']}>
                <img
                    src={bannerDetail.img}
                    alt={bannerDetail.description}
                />
            </div>
            <div className={styles['description-container']}>
                <p>{bannerDetail.description}</p>
            </div>
            </div>
            <div className={styles.actions}> 
                <button className={styles.green} onClick={onEditHandler}>Edit</button>
                <button className={styles.red} onClick={onDeleteHandler}>Delete</button>
                <button className={styles.yellow} onClick={() => exportComponentAsJPEG(componentRef)}>Export to img</button>
            </div>

        </section>
    )
}


export default BannerDetail;