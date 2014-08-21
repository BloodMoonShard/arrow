<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Login</title>

    <!-- Bootstrap Core CSS -->
    <link href="/assets/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="/assets/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

<div id="wrapper">



    <div class="row">
        <div class="col-lg-12">
        <div class="center-block">
            <div class="col-lg-3">
            <form class="form-signin" action="" method="post">
                <?php if(isset($error)){ echo '<label>Error</label>';} else{ echo '';}?>
                <h1 class="form-signin-heading text-muted">Логин</h1>
                <input type="text" class="form-control" placeholder="Логин" name="login" required="" autofocus="">
                <input type="password" class="form-control" placeholder="Пароль" name="password" required="">
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                    Войти
                </button>
            </form>
            </div>
        </div>
        </div>
    </div>


</div>

<!-- jQuery Version 1.11.0 -->
<script src="/assets/js/jquery-1.11.0.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="/assets/js/bootstrap.min.js"></script>


</body>

</html>