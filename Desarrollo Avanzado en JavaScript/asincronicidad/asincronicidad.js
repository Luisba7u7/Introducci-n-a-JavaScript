const orderList = document.getElementById('orderList'); //Lista
const addOrderBtn = document.getElementById('addOrderBtn'); //boton

let orderId = 1; // Para identificar los pedidos

addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
    }
}


// TODO: Simular la preparación del pedido usando setTimeout y Promise
function prepararOrden(order){
    return new Promise((resolve) => {
        //Tiempo aleatorio entre 5 a 20 segundos
        const preparationTime = Math.floor(Math.random() * 15000) + 5000;
        console.log(preparationTime)
        setTimeout(() => {
            resolve();
        }, preparationTime)
    })
}


async function processOrder(order) {
    // TODO: Actualizar el estado del pedido a "Completado"
    await prepararOrden(order);

    //Actualiza el estado cuando se haya acompletado la preparacion
    order.status = "Completado";

    updateOrderStatus(order, order.status);
}

