const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="/search.svg" alt="Search"/>

                <input placeholder="Search thorugh thousands of movies"
                       onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}/>
            </div>
        </div>
    )
}

export default Search;