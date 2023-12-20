import React from "react";

import { copy, loader, linkIcon, tick } from "../assets";
import { useState , useEffect} from "react";
import { useLazyGetSummaryQuery } from "../features/articleSlice";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { isError, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('allArticles'))
    if(articlesFromLocalStorage){
        setAllArticles(articlesFromLocalStorage)
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedArticles);

      localStorage.setItem('allArticles',JSON.stringify(updatedArticles));
    }
  };

  const handlerCopy = (copyUrl) =>{
    setCopied(copyUrl);
    navigator.clipboard.writeText(copied);
    
  }

  const handlerClear = () => {
    setAllArticles([]);
    localStorage.setItem('allArticles',JSON.stringify([]));
  }

  return (
    <section className=" max-w-2xl mt-16 w-full">
      <div className="flex gap-2 flex-col w-full">
        <form
          className=" relative flex justify-center items-center"
          onSubmit={submitHandler}
        >
          <img
            className="absolute left-0 ml-2"
            src={linkIcon}
            alt="link_icon"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            } // Assigning the url of the State article with input value
            className="url_input peer"
            required
          />
          <button
            type="submit"
            className="submit_btn 
                    peer-focus: border-gray-700
                    peer-focus: text-gray-700"
          >
            Go
          </button>
        </form>
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {allArticles.map( (item,index) => (
                <div 
                key={`link-${index}`}
                className="link_card"
                onClick={() => {setArticle(item)}}
                >

                <div className="copy_btn" onClick={ () => handlerCopy(item.url)}>
                    <img src={copied == item.url ? tick : copy}  alt="copy_btn" className=" w-[40%] h-[40%] object-contain" />
                </div>

                <p className="flex-1 font-satoshi text-sm truncate font-medium text-blue-800">
                    {item.url}
                </p>

                </div>
            ) )}
            <div className=" font-satoshi ml-2 text-sm" onClick={handlerClear}>
              <button>Clear</button>
            </div>
        </div>
        <div className="my-10 max-w-full flex items-center justify-center">
                {isFetching ? (
                    <img src={loader} alt="loader"  className=" w-20 h-20 object-contain"/>
                ) : isError ? (
                    <p className=" font-inter font-bold text-black text-center">
                        Unable to fetch your data at the moment...fixing it right away.

                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-3">
                           <h2 className=" font-satoshi font-bold text-gray-600 text-xl"> Article Summary</h2>
                           <div className="summary_box">
                            <p className=" font-inter font-medium text-sm ">{article.summary}</p>

                           </div>
                        </div>

                    )
                )}
        </div>
      </div>
    </section>
  );
};

export default Demo;
