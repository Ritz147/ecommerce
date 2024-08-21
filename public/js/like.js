async function likeProduct(productId,btn) {
    try {
        const res = await axios({
            method: 'post',
            url: `/products/${productId}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        });
          
    if(btn.classList.contains('fa-regular'))
    {
        btn.classList.remove('fa-regular');
        btn.classList.add('fa-solid');
    }
    else{
        btn.classList.remove('fa-solid');
        btn.classList.add('fa-regular');
    }
    
        console.log(res);
}
    catch (e) {
        window.location.replace('/login');
    }
}


window.document.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.classList.contains('product-like-btn')) {
        const productId = btn.getAttribute('product-id');
        likeProduct(productId, btn);
    
    }

})