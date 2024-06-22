<?php
$datosRecibidos = false;
$datos = $_POST;

if ($datos = $_POST) {

    $nombre = $datos['nombre'] ?? '';
    $email = $datos['email'] ?? '';
    $telefono = $datos['telefono'] ?? '';
    $comentario = $datos['comentario'] ?? '';

    $datosRecibidos = true;
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MoviesApp</title>
    <link rel="stylesheet" href="css/materialize.min.css">
    <link rel="stylesheet" href="css/estilos.css">
</head>

<body>
<nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo center">MoviesApp</a>
      <a class="waves-effect pink darken-2 btn" id="loginButton">Login</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/">Home</a></li>
        <li><a href="contacto.php">Contacto</a></li>
      </ul>
      <a class="waves-effect pink darken-2 btn" id="installButton">Instalar</a>
    </div>
  </nav>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>Contacto</h2>
            </div>

            <div class="col-xs-12 col-sm-9">
                <div id="formulario">
                    <?php if (!$datosRecibidos) : ?>
                        <form class="w-100" action="#" method="post">
                            <div class="d-flex mb-3">
                                <label for="inputNombre" class="col-sm-4 col-form-label">Nombre</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputNombre" name="nombre">
                                </div>
                            </div>
                            <div class="d-flex mb-3">
                                <label for="inputEmail" class="col-sm-4 col-form-label">Email</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control" id="inputEmail" name="email">
                                </div>
                            </div>
                            <div class="d-flex mb-3">
                                <label for="inputTelefono" class="col-sm-4 col-form-label">Teléfono</label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="inputTelefono" name="telefono">
                                </div>
                            </div>
                            <div class="d-flex mb-3">
                                <label for="comentario" class="col-sm-4 col-form-label">Comentario</label>
                                <div class="col-sm-8">
                                    <textarea class="form-control" id="comentario" rows="3" name="comentario"></textarea>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary float-right">Enviar</button>
                        </form>
                    <?php endif; ?>

                    <?php if ($datosRecibidos) : ?>
                        <div id="datos" class="col-12 datos">
                            <h3 class="text-start">Gracias! Nos contactaremos a la brevedad.</h3>
                            <p>Nombre: <?php echo $nombre; ?></p>
                            <p>Email: <?php echo $email; ?></p>
                            <p>Teléfono: <?php echo $telefono; ?></p>
                            <p>Comentario: <?php echo $comentario; ?></p>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    </section>
    <script src="js/materialize.min.js"></script>
    <script src="js/script.js" type="module"></script>
</body>

</html>