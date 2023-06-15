Duda #1:
Sobre buenas practicas.
Las validaciones de los request, deberian ir dentro del route previos a instanciar el manager? 
O el route deberia enviar el (por ejemplo) req.body completo y dejar las validaciones a cargo del manager?

Duda #2:
El metodo checkProductValues (linea 28) del manager no estaria funcionando en el metodo de addProduct,
apuesto todo a que es un problema de asincronia, addProduct no esta esperando el resultado de cada chequeo,
y por eso pasan como truthy? No pude encontrarle la vuelta, de resolverlo este metodo haria al codigo mas prolijo y robusto.

Duda #3:
En los router, conviene declarar una variable (o constante) global con el resultado del getProducts,
y usar ese valor cada vez que se instancia algun router? O conviene declarar esa variable en cada uno 
de los router por una cuestion de persistencia de datos?