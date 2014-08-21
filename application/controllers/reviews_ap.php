<?php
class Reviews_ap extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    function index(){
        $this->render('admin/reviews');
    }

}