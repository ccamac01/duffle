// Creates a Cart object by taking in the previous Cart object of the user, and updating appropriately
module.exports = function Cart (prevCart) {
    this.items = prevCart.items || {};
    this.totalQty = prevCart.totalQty || 0;
    this.totalPrice = prevCart.totalPrice || 0;

    // process of adding an item to the cart:
    // 1) if the item we want to add already exists in the cart, update quantity and price values
    // 2) else create a new item-entry in the cart
    this.add = (item, id) => {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item, qty: 0, price: 0};
        }
        storedItem.qty += 1;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty += 1;
        this.totalPrice += storedItem.item.price;
    };

    // generate an array of all items currently in the cart
    this.itemList = () => {
        var itemList = [];
        for (var id in this.items) {
            itemList.push(this.items[id]);
        }
        return itemList;
    };
};