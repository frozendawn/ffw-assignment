import { useEffect, useState } from "react";
import Banner from "./Banner";
import styles from './Banners.module.css';


const Banners = (props) => {

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        console.log('logging process.env ',process.env);
        const fetchBanners = async () => {
            const response = await fetch('https://ffw-assignment-default-rtdb.europe-west1.firebasedatabase.app/banners.json');
            const data = await response.json();
            const convertedData = [];

            for (const key in data) {
                convertedData.push({
                    id: key,
                    img: data[key].img,
                    description: data[key].description
                })
            }


            setBanners(convertedData);
        }
        console.log('useEffect run in banners')
        fetchBanners();
    },[])


    return (
        <main>
            <section className={styles.Banners}>
                {banners.map(banner => {
                    return (
                        <Banner key={banner.id} id={banner.id} img={banner.img} description={banner.description} />
                    )
                })}
            </section>
        </main>

    )
}

export default Banners;