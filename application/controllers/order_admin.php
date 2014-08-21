<?php
class Order_admin extends Admin_Controller
{

    function __construct()
    {
        parent::__construct();

    }

    function index(){
        $this->render('admin/order', array());
    }

}