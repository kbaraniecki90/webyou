<?php 

function theme_styles()
{
    wp_enqueue_style( 'theme_css', get_template_directory_uri() . '/dist/css/main.css' );
}
add_action( 'wp_enqueue_scripts', 'theme_styles' ); 

function theme_js()
{
    global $wp_scripts;
    wp_enqueue_script( 'theme_js', get_template_directory_uri() . '/dist/js/main.js', true );
}
add_action( 'wp_enqueue_scripts', 'theme_js' );