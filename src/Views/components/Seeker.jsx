import React, {useState} from "react";
import {AutoComplete} from "antd";
import RadioAPI from "../../api/RadioAPI.js";

const instanceAPIRadio = new RadioAPI();

export default function Seeker({setChannelParser, setResultsApi}){
    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {

        if (!value) {
            setOptions([]);
        }else{
            instanceAPIRadio.searchStation(value).then(e => {
                const tmpMap = [];
                const dataTable = [];
                for(let i = 0; i < e.hits.hits.length; i++) {

                    const typeStation = e.hits.hits[i]._source.url.split("/")
                    if(typeStation[1] === "listen"){
                        tmpMap.push({value: `${e.hits.hits[i]._source.title} ${e.hits.hits[i]._source.url}`});

                        dataTable.push({
                            id: e.hits.hits[i]._id,
                            score:e.hits.hits[i]._score,
                            code: e.hits.hits[i]._source.code,
                            subtitle: e.hits.hits[i]._source.subtitle,
                            title: e.hits.hits[i]._source.title,
                            channel: e.hits.hits[i]._source.channel,
                            url: e.hits.hits[i]._source.url

                        });
                    }


                }

                setOptions(tmpMap);
                setResultsApi(dataTable);

            }).catch(e => {
                console.log(e);
            });
        }

    };

    const onSelect = (value) => {
        const channel = value.replaceAll(" ", "").split("/").pop();

        instanceAPIRadio.parseChannel(channel).then(e => {
            setChannelParser(e.url);
        }).catch(e => {
            console.log(e);
        });

        // … navegación, búsqueda, lo que necesites …
    };

    return (
        <>
            <AutoComplete placeholder="Buscar"
                          options={options}
                          style={{ width: '100%', marginLeft: '8vw' }}
                          onSelect={onSelect}
                          onSearch={handleSearch}
                          dropdownStyle={{ maxHeight: 250, overflow: 'auto' }} // controla altura
            ></AutoComplete>
        </>
    );
}