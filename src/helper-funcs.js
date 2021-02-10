
export const getEntriesByDate = (posts, date) => {
 
    return(
        posts.filter(post => post.date_created == date)
    )
    
}

export const getNumberofEntries = (posts) => {

    return (
        posts.length
    )
}