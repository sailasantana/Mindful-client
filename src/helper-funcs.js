//import Calendar from 'react-calendar';


export  const getEntriesByDate = (posts, date) => {
 
    return(
        posts.filter(post => post.date_created == date)
    )
    
}