console.log("estamos conectados al js");

const products = [
    { id: crypto.randomUUID(), name: "Camara Pro Mirrorless", category: "Fotografia", price: 850000, stock: 4 },
    { id: crypto.randomUUID(), name: "Lente 50mm f/1.8", category: "Fotografia", price: 199990, stock: 10 },
    { id: crypto.randomUUID(), name: "Tripode de Carbono", category: "Soporte", price: 75000, stock: 15 },
    { id: crypto.randomUUID(), name: "Foco LED RGB 60W", category: "Iluminacion", price: 120000, stock: 8 },
    { id: crypto.randomUUID(), name: "Tarjeta SD 128GB V60", category: "Almacenamiento", price: 45990, stock: 25 },
    { id: crypto.randomUUID(), name: "Softbox Octogonal", category: "Iluminacion", price: 55000, stock: 12 },
    { id: crypto.randomUUID(), name: "Estabilizador de 3 Ejes", category: "Soporte", price: 320000, stock: 6 },
    { id: crypto.randomUUID(), name: "Mochila Tecnica", category: "Transporte", price: 89990, stock: 20 }
];

// New formatting function added for CLP
const formatearCLP = (numero) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(Math.round(numero));
};

const crearTabla = () => {
    const tablaArray = products.map(
        (product) => `    
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td class="text-center">${formatearCLP(product.price)}</td>
            <td class="text-center"> ${product.stock} </td>
            <td class="text-center">     
                <button onclick="Modificar('${product.id}')" class="btn btn-outline-success" type="button">Modificar</button>
                <button onclick="Eliminar('${product.id}')" class="btn btn-outline-danger" type="button">Eliminar</button>
            </td>
        </tr>
        `,
    );

    ValorTotal = products.reduce((total, product) => total + product.price * product.stock, 0);
    document.getElementById('valorTotal').textContent = formatearCLP(ValorTotal);
    return (tablaArray.join(''))
}
document.getElementById('creaTabla').innerHTML = crearTabla();

//buscar productos

function BuscarProd() {
    const input = document.getElementById("searchInput");
    const contenedor = document.getElementById("resultadoBusqueda");
    const busqueda = input.value.trim();

    contenedor.innerHTML = "";

    if (busqueda === "") {
        alert("Por favor ingrese Producto que desea encontrar");
        return;
    }
    const resultados = products.filter((p) =>
        p.name.toLowerCase().includes(busqueda.toLowerCase())
    );
    if (resultados.length > 0) {
        resultados.forEach((prod) => {
            const infoProducto = `
                <div class="producto-item">
                    <p><strong>Nombre:</strong> ${prod.name}</p>
                    <p><strong>Stock:</strong> ${prod.stock}</p>
                    <hr>
                </div>
            `;
            contenedor.innerHTML += infoProducto;
        });
    } else {
        contenedor.innerHTML = `<p>No existen coincidencias con "${busqueda}", por favor intente nuevamente</p>`;
    }
}

//eliminar productos

const Eliminar = (idABuscar) => {
    const indice = products.findIndex(product => product.id === idABuscar);

    if (indice !== -1) {
        const confirmar = confirm(`¿Estás seguro de que deseas eliminar "${products[indice].name}"?`);
        if (confirmar) {
            products.splice(indice, 1);
            document.getElementById('creaTabla').innerHTML = crearTabla();
            alert("Producto eliminado con éxito");
        }
    } else {
        console.error("No se encontró el producto con ID:", idABuscar);
    }
}


//modificar productos
let idProductoEditando = null;
const Modificar = (idABuscar) => {
    const producto = products.find(p => p.id === idABuscar);

    if (producto) {
        document.getElementById('AgregarProductoInput').value = producto.name;
        document.getElementById('AgregarCategoriaInput').value = producto.category;
        document.getElementById('AgregarPrecioInput').value = producto.price;
        document.getElementById('AgregarCantidadInput').value = producto.stock;
        const btnAccion = document.getElementById('loadProductForm');
        btnAccion.innerText = "Aceptar Modificación";
        btnAccion.classList.replace('btn-outline-primary', 'btn-warning');
        idProductoEditando = idABuscar;
        document.getElementById('AgregarProductoInput').focus();
    }
};


//agregar productos

const btnAgregar = document.getElementById('loadProductForm');

btnAgregar.addEventListener('click', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('AgregarProductoInput').value.trim();
    const categoria = document.getElementById('AgregarCategoriaInput').value;
    const precio = Number(document.getElementById('AgregarPrecioInput').value);
    const stock = Number(document.getElementById('AgregarCantidadInput').value);

    if (!nombre || !precio || !stock) {
        alert("Por favor, completa todos los campos con valores válidos.");
        return;
    }
    if (precio <= 0 || stock < 0) {
        alert("El precio debe ser mayor a 0 y el stock no puede ser negativo.");
        return;
    }
    if (idProductoEditando) {
        const indice = products.findIndex(p => p.id === idProductoEditando);

        products[indice] = {
            ...products[indice],
            name: nombre,
            category: categoria,
            price: precio,
            stock: stock
        };
        alert("¡Producto modificado con éxito!");
        idProductoEditando = null;
        btnAgregar.innerText = "Agregar Producto";
        btnAgregar.classList.replace('btn-warning', 'btn-outline-primary');
    } else {
        const existe = products.some(p => p.name.toLowerCase() === nombre.toLowerCase());
        if (existe) {
            alert(`¡Error! Ya existe un producto llamado "${nombre}".`);
            limpiarFormularioAgregar();
            return;
        }
        const nuevoProducto = {
            id: crypto.randomUUID(),
            name: nombre,
            category: categoria,
            price: precio,
            stock: stock
        };
        products.push(nuevoProducto);
        alert("¡Producto agregado con éxito!");
    }
    document.getElementById('creaTabla').innerHTML = crearTabla();
    limpiarFormularioAgregar();
});

const limpiarFormularioAgregar = () => {
    document.getElementById('AgregarProductoInput').value = "";
    document.getElementById('AgregarCategoriaInput').value = "";
    document.getElementById('AgregarPrecioInput').value = "";
    document.getElementById('AgregarCantidadInput').value = "";
};


