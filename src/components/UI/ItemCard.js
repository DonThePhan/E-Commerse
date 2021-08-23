import Reac, { useState, useContext } from 'react';
import classes from './ItemCard.module.css';
import Button from './Button';
import DataContext from '../../store/data-context';

const maxDescriptionChars = 100;

export default function ItemCard(props) {
    const { id, title, price, description, category, image } = props.item;
    const {addToOrder, removeFromOrder} = useContext(DataContext)

	const [ hover, setHover ] = useState(false);

	function onMouseEnterHandler() {
		setHover(true);
	}
	function onMouseLeaveHandler() {
		setHover(false);
    }
    
    function addToOrderHandler() {
        addToOrder(id)
    }

    function removeFromOrderHandler() {
        removeFromOrder(id)
    }

	return (
		<div
			onMouseLeave={onMouseLeaveHandler}
			onMouseEnter={onMouseEnterHandler}
			className={`${props.className} ${classes.itemCard}`}
		>
			<div className={`${classes.innerItemCard} ${hover ? classes.hover : null}`}>
				<img className={classes.img} src={image} alt="" />
				<p className={classes.title}>{title}</p>
				<p className={classes.description}>
					{hover ? (
						description
					) : description.length > maxDescriptionChars ? (
						description.substring(0, maxDescriptionChars) + '...'
					) : (
						description
					)}
				</p>
                <p className={classes.price}>${price}</p>
                {hover && <div className={classes.addToCartContainer}>
                    <Button onClick={addToOrderHandler}>Add to Cart</Button>
                    <Button onClick={removeFromOrderHandler}>Remove</Button>
                </div>}
			</div>
		</div>
	);
}
