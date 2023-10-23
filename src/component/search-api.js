
import axios from 'axios';
import '../App.css';
import React, { useEffect, useState } from 'react'

const SearchApi = () => {

    // const [searchQuery, setSearchQuery] = useState('');
    // const [searchResult, setSearchResult] = useState([]);
    const [apidata, setApidata] = useState([]);

    const [selectQuery, setSelectQuery] = useState({ all: '', angry: '', monkey: '', hand: '' });
    const [selectResult, setSelectResult] = useState([]);

    const [checkResult, setCheckResult] = useState([]);

    //Render api on the page
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://emoji-api.com/emojis?access_key=b1e697a9822cfb9047a931d3f8032d50e3a52399',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            setApidata(response.data);
        }).catch(error => {
            console.error("Error fetching data : ", error);
        })
    }, [])

    // useEffect(() => {
    //     switch(searchMethod){
    //         case 'searchResult':
    //             return searchRes
    //     }
    // }, [])

    // search input box
    // const handleSearch = (query) => {
    //     setSearchQuery(query);

    //     var filterEmojis = apidata.filter(item =>
    //         item.unicodeName.toLowerCase().includes(query.toLowerCase())
    //     )

    //     setSearchResult(filterEmojis);
    // }

    // handle the search api item by the select option
    const handleSelect = (e) => {
        setSelectQuery(e);
        var filterSelect = apidata.filter(emojis =>
            (e.toLowerCase() === 'all') ? emojis.character :
                emojis.unicodeName.toLowerCase().includes(e.toLowerCase())
        )
        setSelectResult(filterSelect);
    }

    // handle the search api item by the checkbox
    const handleCheck = (e) => {
        var filterValue = e.target.value;
        var checkedValue = e.target.checked;

        // if (!checkedValue) {
        //     setCheckResult(checkResult.filter((item) => item !== filterValue));

        // } else {
        //     setCheckResult([...checkResult, filterValue]);
        //     var checkFilterData = apidata.filter(item =>
        //         (filterValue.toLowerCase() === 'all') ? item.character :
        //             item.unicodeName.toLowerCase().includes(filterValue.toLowerCase())
        //     )
        //     setCheckResult(checkFilterData);
        // }

        if (filterValue === 'all') {
            if (checkedValue) {
                setCheckResult(apidata);
            } else {
                setCheckResult([]);
            }
        } else if (filterValue === 'angry' || filterValue === 'monkey' || filterValue === 'hand') {
            if (checkedValue) {

                setCheckResult([...checkResult, filterValue]);
                var filterData = apidata.filter(item =>
                    item.unicodeName.toLowerCase().includes(filterValue.toLowerCase())
                )
                setCheckResult(filterData);
            } else {
                setCheckResult(checkResult.filter(item => item !== filterValue));
            }
        } else {
            setCheckResult([]);
        }
    };

    return (
        <div>
            <h3>SearchAPI</h3>

            <header>
                {/* Input box  */}
                <input type="text" placeholder="search emoji's" className='mt-4' onChange={(e) => handleSelect(e.target.value)} />
            </header>

            <section className='grid'>
                <nav>
                    {/* Select option  */}
                    <select className=' mt-3 select-option' onChange={(e) => handleSelect(e.target.value)}>
                        <option value={selectQuery.all}>All</option>
                        <option value={selectQuery.angry}>Angry</option>
                        <option value={selectQuery.monkey}>Monkey</option>
                        <option value={selectQuery.hand}>Hand</option>
                    </select>

                    {/* Checkbox  */}
                    <div className='container-fluid gap-3 check-box'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value='all' id="all" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="all" >
                                All
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value='angry' id="angry" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="angry">
                                Angry
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value='monkey' id="monkey" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="monkey">
                                Monkey
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value='hand' id="hand" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="hand">
                                Hand
                            </label>
                        </div>
                    </div>

                    {/* radio button */}
                    <div className='container-fluid gap-3 mt-5 radio-button'>
                        <div className="form-check">
                            <input className="form-check-input" name='radioCheck' type="radio" value='all' id="all" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="all" >
                                All
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" name='radioCheck' type="radio" value='angry' id="angry" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="angry">
                                Angry
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" name='radioCheck' type="radio" value='monkey' id="monkey" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="monkey">
                                Monkey
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" name='radioCheck' type="radio" value='hand' id="hand" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="hand">
                                Hand
                            </label>
                        </div>
                    </div>
                </nav>

                <main className='container d-flex flex-wrap gap-3 justify-content-evenly mt-5'>
                    {/* Rendering on the page  */}
                    <div className='render-page container d-flex flex-wrap gap-3 justify-content-evenly mt-5 '>
                        {
                            selectResult.map((item, index) => {
                                return <span key={index}>{item.character}</span>
                            })
                        }
                    </div>

                    <div className='render-page container d-flex flex-wrap gap-3 justify-content-evenly mt-5'>
                        {
                            checkResult.length > 0 ?
                                checkResult.map((item, index) => {
                                    return <span key={index}>{item.character}</span>
                                }) :
                                <p>No result found</p>
                        }
                    </div>
                </main>
            </section>
        </div>
    )
}

export default SearchApi;
