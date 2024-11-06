// Storage Controller

const storageCtrl = (function () {
    return {
        saveItemToStorage: function (item) {
            let items;
            if (localStorage.getItem('items') === null) {
                items = [];
            }
            else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            // return items;
        },

        getItemFromStorage: function () {
            let items;
            if (localStorage.getItem('items') === null) {
                items = [];
            }
            else {
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
        },

        deleteItemFromStorage: function (deletedItem) {
            const items = storageCtrl.getItemFromStorage();
            items.forEach((item, index) => {
                if (item.id === deletedItem.id) {
                    items.splice(index, 1);
                    // console.log(item,index);
                }
            });
            let count = 1;
            items.forEach(item => {
                item.id = count;
                count++;
            });
            localStorage.setItem('items', JSON.stringify(items));
            // console.log(items);
            // console.log(itemCtrl.getItems());
        },

        updateItemToStorage: updatedItem => {
            const items = storageCtrl.getItemFromStorage();
            items.forEach(item => {
                if (item.id === updatedItem.id) {
                    item.name = updatedItem.name;
                    item.calorie = updatedItem.calorie;
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },

        deleteAllItemsFromStorage: () => {
            localStorage.removeItem('items');
        }
    }
})();


// Item Controller

const itemCtrl = (function () {
    // console.log('itemCtrl');

    const Item = function (id, name, calorie) {
        this.id = id;
        this.name = name;
        this.calorie = calorie;
    }

    // Data Structure / State
    const data = {
        items: [
            // {
            //     id:1,
            //     name:'Stake Dinner',
            //     calorie:1200
            // },
            // {
            //     id:2,
            //     name:'Eggs',
            //     calorie:300
            // },
            // {
            //     id:3,
            //     name:'Cookie',
            //     calorie:500
            // }
        ],
        currentItem: null,
        totalCalories: 0
    }
    return {
        getItems: function () {
            return data.items;
        },

        getTotalCalorie: function () {
            let calories = 0;
            data.items.forEach(item => {
                calories += parseInt(item.calorie);
            });

            data.totalCalories = calories;

            return data.totalCalories;
        },

        addItem: function (name, calories) {
            let ID;
            if (data.items.length >= 0) {
                ID = data.items.length + 1;
            }

            const newItem = new Item(ID, name, calories);
            data.items.push(newItem);

            return newItem;
        },

        addToCurrentItem: function (id) {
            data.items.forEach(item => {
                if (item.id === id) {
                    data.currentItem = item;
                }
            });
        },

        getCurrentItem: function () {
            return data.currentItem;
        },

        updateItem: input => {
            data.currentItem.name = input.name;
            data.currentItem.calorie = input.calories;
        },

        addUpdatedItem: function (updatedItem) {
            data.items.forEach(item => {
                if (item.id === updatedItem.id) {
                    item.name = updatedItem.name;
                    item.calorie = updatedItem.calorie;
                }
            });
        },

        deleteItem: deletedItem => {
            data.items.forEach(item => {
                if (item.id === deletedItem.id) {
                    data.items.splice((deletedItem.id - 1), 1);
                }
            });
        },

        updateIDs: function () {
            let count = 1;
            data.items.forEach(item => {
                item.id = count;
                count++;
            });
        },

        clearItems: function () {
            data.items = [];
        },

        addStoredItems: function () {
            data.items = storageCtrl.getItemFromStorage();
        },

        logData: function () {
            return data;
        }
    }
})();

// console.log(itemCtrl.logData());
// console.log(itemCtrl.getData());

// UI controller 

const UICtrl = (function () {
    // console.log('UICtrl');

    const UISelector = {
        itemList: '#item-list',
        totalCalories: '.total-calories',
        addMeal: '.add-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        card: '.card'
    };

    return {
        populateItemList: function (items) {

            let html = '';
            items.forEach(item => {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i> 
                    </a>
                </li>
                `;
            });

            document.querySelector(UISelector.itemList).innerHTML = html;
        },

        showTotalCalories: function (cal) {
            document.querySelector(UISelector.totalCalories).textContent = cal;
        },

        UISelectors: function () {
            return UISelector;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UISelector.itemName).value,
                calories: document.querySelector(UISelector.itemCalories).value
            }
        },

        clearInputFields: function () {
            document.querySelector(UISelector.itemName).value = '';
            document.querySelector(UISelector.itemCalories).value = '';
        },

        clearEditState: function () {
            document.querySelector(UISelector.updateBtn).style.display = 'none';
            document.querySelector(UISelector.deleteBtn).style.display = 'none';
            document.querySelector(UISelector.backBtn).style.display = 'none';
            document.querySelector(UISelector.addMeal).style.display = 'inline';
        },

        showEditState: () => {
            document.querySelector(UISelector.updateBtn).style.display = 'inline';
            document.querySelector(UISelector.deleteBtn).style.display = 'inline';
            document.querySelector(UISelector.backBtn).style.display = 'inline';
            document.querySelector(UISelector.addMeal).style.display = 'none';
        },

        showDataToInput: function (item) {
            document.querySelector(UISelector.itemName).value = item.name;
            document.querySelector(UISelector.itemCalories).value = item.calorie;
        },

        // updateItemToUI:updatedItem=>{
        //     const items=itemCtrl.getItems();
        //     items.forEach(item=>{
        //         if(item.id===updatedItem.id){
        //             item.name=updatedItem.name;
        //             item.calorie=updatedItem.calorie;
        //         }
        //     });
        // }

    }
})();

// console.log(UICtrl.text());
//App Controller

const appCtrl = (function (itemCtrl, UICtrl, storageCtrl) {
    // console.log('apptrl');

    const loadEvent = function () {
        const UISelectors = UICtrl.UISelectors();

        document.querySelector(UISelectors.addMeal).addEventListener('click', addMeal);

        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);

        document.querySelector(UISelectors.card).addEventListener('click', runEvent);

        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);

        document.addEventListener('DOMContentLoaded', loadFromStorage);
    };

    const addMeal = function (e) {

        const input = UICtrl.getItemInput();
        console.log(input);

        if (input.name !== '' && input.calories !== '') {
            const newItem = itemCtrl.addItem(input.name, input.calories);
            console.log(newItem);
            UICtrl.populateItemList(itemCtrl.getItems());
            console.log(itemCtrl.getItems());
            UICtrl.showTotalCalories(itemCtrl.getTotalCalorie());
            UICtrl.clearInputFields();
            storageCtrl.saveItemToStorage(newItem);
        }

        e.preventDefault();
    };

    const itemUpdateSubmit = function (e) {
        if (e.target.classList.contains('edit-item')) {
            const list = e.target.parentElement.parentElement.id;

            const listIdArr = list.split('-');
            // console.log(listIdArr);

            const listId = parseInt(listIdArr[1]);

            itemCtrl.addToCurrentItem(listId);
            // console.log(itemCtrl.getCurrentItem());
            const listItem = itemCtrl.getCurrentItem();
            // console.log(listItem);
            UICtrl.showDataToInput(listItem);

            UICtrl.showEditState();
        }

        e.preventDefault();
    };

    const runEvent = function (e) {
        if (e.target.classList.contains('update-btn')) {
            const listItem = itemCtrl.getCurrentItem();
            console.log(listItem);
            const inputs = UICtrl.getItemInput();
            // console.log(inputs);
            itemCtrl.updateItem(inputs);
            console.log(listItem);
            // UICtrl.updateItemToUI(listItem);
            itemCtrl.addUpdatedItem(listItem);

            // console.log(itemCtrl.getItems());
            UICtrl.populateItemList(itemCtrl.getItems());
            UICtrl.showTotalCalories(itemCtrl.getTotalCalorie());
            UICtrl.clearEditState();
            UICtrl.clearInputFields();
            storageCtrl.updateItemToStorage(listItem);
        }

        else if (e.target.classList.contains('back-btn')) {
            UICtrl.clearEditState();
            UICtrl.clearInputFields();
        }

        else if (e.target.classList.contains('delete-btn')) {
            const listItem = itemCtrl.getCurrentItem();
            console.log(listItem);
            itemCtrl.deleteItem(listItem);
            // console.log(itemCtrl.getItems());
            itemCtrl.updateIDs();
            // console.log(itemCtrl.getItems());
            UICtrl.populateItemList(itemCtrl.getItems());
            UICtrl.showTotalCalories(itemCtrl.getTotalCalorie());
            UICtrl.clearEditState();
            UICtrl.clearInputFields();
            storageCtrl.deleteItemFromStorage(listItem);
        }
        // console.log(e.target);
        e.preventDefault();
    };

    const clearAllItems = function () {
        itemCtrl.clearItems();
        UICtrl.populateItemList(itemCtrl.getItems());
        UICtrl.showTotalCalories(itemCtrl.getTotalCalorie());
        storageCtrl.deleteAllItemsFromStorage();
    };

    const loadFromStorage = function () {
        // itemCtrl.getItems()=storageCtrl.getItemFromStorage();
        // let items = itemCtrl.getItems();
        // items = storageCtrl.getItemFromStorage();
        itemCtrl.addStoredItems();
        const items = itemCtrl.getItems()
        UICtrl.populateItemList(items);
        UICtrl.showTotalCalories(itemCtrl.getTotalCalorie());
    };

    return {
        init: function () {
            console.log('Initializing App ...');

            UICtrl.clearEditState();

            let items = itemCtrl.getItems();
            // items = JSON.parse(localStorage.getItem('items'));
            // console.log(items);
            const cal = itemCtrl.getTotalCalorie();
            // console.log(cal);
            UICtrl.populateItemList(items);
            UICtrl.showTotalCalories(cal);
            // console.log(localStorage.getItem('items'));
            loadEvent();
        }
    }
})(itemCtrl, UICtrl, storageCtrl);

appCtrl.init();