import Ingredients from "./Ingredients";

export default function List(props)
{
    const InElements=props.ingredientsList.map((ing) => (
      <Ingredients key={ing} name={ing} />
    ));

    return (props.ingredientsList.length>0 && (
        <div className="main-ign-container">
          <h1>Ingredients in hand:</h1>

          <ul className="ign-list">{InElements}</ul>

          {props.ingredientsList.length>4 && (
            <div className="recipe-box">
              <h2 className="recipe-title">Ready for a Recipe?</h2>
              <p className="recipe-subtext">
                Generate a delicious recipe using your list of ingredients.
              </p>
              <button className="recipe-btn" onClick={props.get}>
                Get a Recipe →
              </button>
            </div>
          )}
        </div>
      ))
}
