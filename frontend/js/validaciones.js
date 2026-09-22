```javascript
const dominiosPermitidos = [
    "@duoc.cl",
    "@profesor.duoc.cl",
    "@gmail.com"
];


// =====================================================
// FUNCIONES GENERALES
// =====================================================

function correoValido(correo) {

    return dominiosPermitidos.some(function(dominio) {
        return correo.toLowerCase().endsWith(dominio);
    });

}


function obtenerUsuarios() {

    const usuariosGuardados = localStorage.getItem("usuarios");

    if (usuariosGuardados === null) {
        return [];
    }

    return JSON.parse(usuariosGuardados);
}


function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}


// =====================================================
// R.1 - INICIO DE SESIÓN
// =====================================================

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function(event) {

        event.preventDefault();

        const correo =
            document.getElementById("correo").value.trim();

        const contrasena =
            document.getElementById("contrasena").value;


        const errorCorreo =
            document.getElementById("errorCorreo");

        const errorContrasena =
            document.getElementById("errorContrasena");

        const mensaje =
            document.getElementById("mensajeLogin");


        errorCorreo.textContent = "";
        errorContrasena.textContent = "";
        mensaje.textContent = "";


        let valido = true;


        // Validar correo

        if (correo === "") {

            errorCorreo.textContent =
                "El correo es obligatorio.";

            valido = false;

        }
        else if (correo.length > 100) {

            errorCorreo.textContent =
                "El correo no puede superar los 100 caracteres.";

            valido = false;

        }
        else if (!correoValido(correo)) {

            errorCorreo.textContent =
                "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";

            valido = false;

        }


        // Validar contraseña

        if (contrasena === "") {

            errorContrasena.textContent =
                "La contraseña es obligatoria.";

            valido = false;

        }
        else if (
            contrasena.length < 4 ||
            contrasena.length > 10
        ) {

            errorContrasena.textContent =
                "La contraseña debe tener entre 4 y 10 caracteres.";

            valido = false;

        }


        // Si las validaciones básicas fallaron,
        // no buscamos el usuario.

        if (!valido) {
            return;
        }


        // Obtener usuarios guardados

        const usuarios = obtenerUsuarios();


        // Buscar usuario por correo

        const usuarioEncontrado = usuarios.find(function(usuario) {

            return usuario.correo.toLowerCase() === correo.toLowerCase();

        });


        // Comprobar usuario

        if (!usuarioEncontrado) {

            mensaje.textContent =
                "El correo no está registrado.";

            return;

        }


        // Comprobar contraseña

        if (usuarioEncontrado.contrasena !== contrasena) {

            mensaje.textContent =
                "La contraseña es incorrecta.";

            return;

        }


        // Login correcto

        mensaje.textContent =
            "Inicio de sesión exitoso.";

    });

}


// =====================================================
// R.2 - REGISTRO DE USUARIO
// =====================================================

const formRegistro =
    document.getElementById("formRegistro");


if (formRegistro) {

    formRegistro.addEventListener("submit", function(event) {

        event.preventDefault();


        const run =
            document.getElementById("run").value.trim();

        const nombre =
            document.getElementById("nombre").value.trim();

        const apellidos =
            document.getElementById("apellidos").value.trim();

        const correo =
            document.getElementById("correoRegistro").value.trim();

        const contrasena =
            document.getElementById("contrasenaRegistro").value;

        const fechaNacimiento =
            document.getElementById("fechaNacimiento").value;

        const tipoUsuario =
            document.getElementById("tipoUsuario").value;

        const region =
            document.getElementById("region").value;

        const comuna =
            document.getElementById("comuna").value;

        const direccion =
            document.getElementById("direccion").value.trim();


        const errorRun =
            document.getElementById("errorRun");

        const errorCorreo =
            document.getElementById("errorCorreoRegistro");

        const errorContrasena =
            document.getElementById("errorContrasenaRegistro");

        const mensaje =
            document.getElementById("mensajeRegistro");


        errorRun.textContent = "";
        errorCorreo.textContent = "";
        errorContrasena.textContent = "";
        mensaje.textContent = "";


        let valido = true;


        // Validar RUN

        if (run === "") {

            errorRun.textContent =
                "El RUN es obligatorio.";

            valido = false;

        }
        else if (run.length < 7 || run.length > 9) {

            errorRun.textContent =
                "El RUN debe tener entre 7 y 9 caracteres.";

            valido = false;

        }
        else if (!/^[0-9]+[0-9Kk]$/.test(run)) {

            errorRun.textContent =
                "El RUN contiene caracteres inválidos.";

            valido = false;

        }


        // Validar correo

        if (correo === "") {

            errorCorreo.textContent =
                "El correo es obligatorio.";

            valido = false;

        }
        else if (correo.length > 100) {

            errorCorreo.textContent =
                "El correo no puede superar los 100 caracteres.";

            valido = false;

        }
        else if (!correoValido(correo)) {

            errorCorreo.textContent =
                "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";

            valido = false;

        }


        // Validar contraseña

        if (contrasena === "") {

            errorContrasena.textContent =
                "La contraseña es obligatoria.";

            valido = false;

        }
        else if (
            contrasena.length < 4 ||
            contrasena.length > 10
        ) {

            errorContrasena.textContent =
                "La contraseña debe tener entre 4 y 10 caracteres.";

            valido = false;

        }


        // Si algo está incorrecto,
        // detenemos el registro.

        if (!valido) {
            return;
        }


        // Obtener usuarios existentes

        const usuarios = obtenerUsuarios();


        // Comprobar si el correo ya existe

        const correoExiste = usuarios.some(function(usuario) {

            return usuario.correo.toLowerCase() === correo.toLowerCase();

        });


        if (correoExiste) {

            errorCorreo.textContent =
                "Este correo ya está registrado.";

            return;

        }


        // Crear nuevo usuario

        const nuevoUsuario = {

            run: run,
            nombre: nombre,
            apellidos: apellidos,
            correo: correo,
            contrasena: contrasena,
            fechaNacimiento: fechaNacimiento,
            tipoUsuario: tipoUsuario,
            region: region,
            comuna: comuna,
            direccion: direccion

        };


        // Agregar usuario al arreglo

        usuarios.push(nuevoUsuario);


        // Guardar arreglo actualizado

        guardarUsuarios(usuarios);


        mensaje.textContent =
            "Usuario registrado correctamente.";


        // Limpiar formulario

        formRegistro.reset();

    });

}
```
