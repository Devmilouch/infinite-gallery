import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./InfiniteScroll.css";



const InfiniteScroll = (props) => {
    const [ dataImgs, setDataImgs ] = useState([[], [], []]);
    const [ pageIndex, setPageIndex ] = useState(1);
    const [ searchState, setSearchState ] = useState("random");
    const [ firstCall, setFirstCall ] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", infiniteCheck);

        return () => {
            window.removeEventListener("scroll", infiniteCheck);
        }
    }, []);

    useEffect(() => {
        infiniteFetchData();
    }, [pageIndex]);

    useEffect(() => {
        if (firstCall) return;
        searchFetchData();
    }, [searchState]);

    const infiniteFetchData = () => {
        fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchState}&client_id=N6ME1pycU6mPw_GkSDTNCD-_zWyeLhAv3qmJd6d4e1A`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const imgsReceived = [];

                data.results.forEach(img => {
                    imgsReceived.push(img.urls.regular);
                })

                const newFreshDataImgs = [
                    [...dataImgs[0]],
                    [...dataImgs[1]],
                    [...dataImgs[2]],
                ]

                let index = 0;
                for (let i = 0; i < 3 ; i++) {
                    for (let j = 0 ; j < 10 ; j++) {
                        newFreshDataImgs[i].push(imgsReceived[index]);
                        index++;
                    }
                }

                setDataImgs(newFreshDataImgs);
                if (firstCall) setFirstCall(!firstCall);
            });
    }

    const searchFetchData = () => {
        fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchState}&client_id=N6ME1pycU6mPw_GkSDTNCD-_zWyeLhAv3qmJd6d4e1A`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const imgsReceived = [];

                data.results.forEach(img => {
                    imgsReceived.push(img.urls.regular);
                })

                const newFreshDataImgs = [
                    [],
                    [],
                    [],
                ]

                let index = 0;
                for (let i = 0; i < 3 ; i++) {
                    for (let j = 0 ; j < 10 ; j++) {
                        newFreshDataImgs[i].push(imgsReceived[index]);
                        index++;
                    }
                }

                setDataImgs(newFreshDataImgs);
            });
    }

    const handleSearch = e => {
        e.preventDefault();

        setSearchState(inpRef.current.value);
        setPageIndex(1);
    }

    const inpRef = useRef();

    const timingBeforeNextFetch = useRef(false);

    const infiniteCheck = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollHeight - (scrollTop + (0.20 * scrollHeight))  <= clientHeight) {     
            
            if(!timingBeforeNextFetch.current) {
                setPageIndex(pageIndex => pageIndex + 1);
                timingBeforeNextFetch.current = true;
                setTimeout(() => {
                    timingBeforeNextFetch.current = false;
                }, 500);
                console.log("Bottom")
            }  
             
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <label htmlFor="search">Votre recherche</label>
                <input type="text" id="search" ref={inpRef} />
            </form>
            <div className="card-list">
                <div>
                    {
                        dataImgs[0].map(url => <img key={uuidv4()} src={url} alt="unsplash" />)
                    }
                </div>
                <div>
                    {
                        dataImgs[1].map(url => <img key={uuidv4()} src={url} alt="unsplash" />)
                    }
                </div>
                <div>
                    {
                        dataImgs[2].map(url => <img key={uuidv4()} src={url} alt="unsplash" />)
                    }
                </div>
            </div>
        </div>
    );
};

export default InfiniteScroll;