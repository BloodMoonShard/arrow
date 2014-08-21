<?php
class Auth extends Admin_Controller
{

    function index(){
        $this->login();
    }


    function login(){
        if($this->input->post()){
            if($this->input->post('login') == $this->login){
                if($this->input->post('password') == $this->password){
                    $this->session->set_userdata('admin', 'true');
                    redirect('/order_admin');
                }
            }
        }
        $this->load->view('admin/login', array());
    }

    function logout(){
        return $this->session->unset_userdata('admin');
    }


}
