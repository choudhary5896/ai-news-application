
import { useEffect, useState } from 'react';
import './App.css';
import alanBtn from "@alan-ai/alan-sdk-web"
import { NewsCards } from './components/NewsCards/NewsCards';
import useStyle from "./style.js"
import wordsToNumbers from 'words-to-numbers';
const alanKey='de1d1d2aac0a7bca8587970b308330792e956eca572e1d8b807a3e2338fdd0dc/stage'


function App() {
  const [newsArticles,setNewsArticles]=useState([]);
  const [activeArticle,setActiveArticle]=useState(-1);
  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand:({ command,articles,number })=>{
      
        if(command === "newHeadlines"){
          console.log(articles)
          setNewsArticles(articles);
          setActiveArticle(-1);
        }else if(command === "highlight"){
          setActiveArticle((prev)=>prev+1);
        } else if(command==="open"){
          // console.log("number would be",number)
          
          const parsedNumber=number.length > 2 ? wordsToNumbers(number,{ fuzzy: true}) : number
          console.log(articles[number].url)
          const article=articles[parsedNumber-1]
          if(parsedNumber>20){
            // alanBtn().playText('Please try that again.')
          } else if(article){
            window.open(article.url,'_blank')
            // alanBtn().playText('opening...')
          } else {
          alanBtn().playText('Please try that again...');
          }
        }
      }
    })
  },[])
  const classes=useStyle();
  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img src ="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" alt='alan logo' className={classes.alanLogo}/>
      </div>
     <NewsCards articles={newsArticles} activeArticle ={activeArticle}/>
    </div>
  );
}

export default App;
