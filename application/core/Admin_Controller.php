<?php
class Admin_Controller extends CI_Controller
{
    public $login;
    public $password;


    function __construct()
    {
        parent::__construct();
        $this->load->model('admin_model');
        $this->login = 'admin';
        $this->password = 'password';
        if(!$this->session->userdata('admin') && $this->uri->segment(1) != 'auth'){
            redirect('auth/login');
        }
    }



    function render($tpl_name, $data = false){
        if(!$data){
            $data = array();
        }
        $this->load->view('admin/header', $data);
        $this->load->view($tpl_name, $data);
        $this->load->view('admin/footer', $data);
    }

    function logout(){
        redirect('auth/logout');
    }


}
