import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';

import styles from './BannerDetail.module.css';

const BannerDetail = (props) => {
    const history = useHistory();
    const params = useParams();
    const [bannerDetail, setBannerDetail] = useState({});

    useEffect(() => {
        const fetchBanner = async () => {
            const response = await fetch(`https://ffw-assignment-default-rtdb.europe-west1.firebasedatabase.app/banners/${params.id}.json`);
            const data = await response.json();
            console.log(data)
            setBannerDetail(data);
        }
        console.log('useEffect run in bannerDetail')
        console.log('loggin props.location in bannerDetail', props.location)
        fetchBanner();
    },[props.location,params])


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
        })

        history.replace('/banners')
    }



    return (
        <section className={styles.detail}>
            <div className={styles['image-container']}>
                <img
                    src={bannerDetail.img}
                    alt={bannerDetail.description}
                />
            </div>
            <div className={styles['description-container']}>
                <p>{bannerDetail.description}</p>
            </div>
            <div className={styles.actions}> 
                <button onClick={onEditHandler}>Edit</button>
                <button onClick={onDeleteHandler}>Delete</button>
            </div>

        </section>
    )
}


export default BannerDetail;