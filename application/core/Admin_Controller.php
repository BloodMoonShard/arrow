<?php
class Admin_Controller extends CI_Controller
{
    private $name;
    private $password;


    function __construct()
    {
        parent::__construct();
    }

    function login(){

    }

    function render($tpl_name, $data = false){
        if(!$data){
            $data = array();
        }
        $this->load->view('admin/header', $data);
        $this->load->view($tpl_name, $data);
        $this->load->view('admin/footer', $data);
    }


}
