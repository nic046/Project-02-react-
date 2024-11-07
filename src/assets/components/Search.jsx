function SearchForm({ cityRef, handleSearch }) {
    return (
      <form onSubmit={handleSearch} className="card__search">
        <input
          type="text"
          ref={cityRef}
          placeholder="Enter a city"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
  
  export default SearchForm;