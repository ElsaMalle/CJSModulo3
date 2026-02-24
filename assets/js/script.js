console.log("estamos conectados al js");

const products = [
    {
        id: crypto.randomUUID(),
        name: "Cámara Pro Mirrorless",
        category: "Fotografía",
        price: 850000,
        stock: 4,
    },
    {
        id: crypto.randomUUID(),
        name: "Lente 50mm f/1.8",
        category: "Fotografía",
        price: 199990,
        stock: 10,
    },
    {
        id: crypto.randomUUID(),
        name: "Trípode de Carbono",
        category: "Soporte",
        price: 75000,
        stock: 15,
    },
    {
        id: crypto.randomUUID(),
        name: "Foco LED RGB 60W",
        category: "Iluminación",
        price: 120000,
        stock: 8,
    },
    {
        id: crypto.randomUUID(),
        name: "Tarjeta SD 128GB V60",
        category: "Almacenamiento",
        price: 45990,
        stock: 25,
    },
    {
        id: crypto.randomUUID(),
        name: "Softbox Octogonal",
        category: "Iluminación",
        price: 55000,
        stock: 12,
    },
    {
        id: crypto.randomUUID(),
        name: "Estabilizador de 3 Ejes",
        category: "Soporte",
        price: 320000,
        stock: 6,
    },
    {
        id: crypto.randomUUID(),
        name: "Mochila Técnica",
        category: "Transporte",
        price: 89990,
        stock: 20,
    }
];

const crearTabla = () => {
    const tablaArray = products.map(
        (product) => `    
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td class="text-end">$${product.price}</td>
            <td class="text-center">
                <!-- Botones para agregar y restar produtos -->
                <div class="input-group input-group-sm justify-content-center">
                    <button class="btn btn-outline-danger" type="button">-</button>
                    <input type="text" class="form-control text-center" value="${product.stock}"
                        style="max-width: 50px;">
                    <button class="btn btn-outline-success" type="button">+</button>
                </div>
            </td>
        </tr>
        `,
    );

    return (tablaArray.join(''))
}
document.getElementById('creaTabla').innerHTML = crearTabla();

//Calcular el valor total del inventario
ValorTotal = products.reduce((total, product) => total + product.price * product.stock, 0);
document.getElementById('valorTotal').textContent = `$${ValorTotal}`;

//buscar elementos

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
            // Creamos un bloque de HTML para cada producto
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


//const resultado= products.filter((X) => X.name == "Lente 50mm f/1.8");
//console.log(resultado); 

