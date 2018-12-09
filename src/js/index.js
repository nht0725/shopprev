require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': 'libs/jquery-3.1.1.min',
        'betterScroll': 'libs/better-scroll'
    }
})

require(['jquery', 'betterScroll'], function($, BScroll) {
    $.ajax({
        url: '/users',
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            if (data.code == 1) {
                render(data.data);
            }
        }
    })

    function render(data) {
        var str = '';
        var baseUrl = 'http://localhost:3000/images/'
        data.forEach(function(file) {
            str += ` <dl>
                    <dt><img src="${baseUrl}${file.img}" alt=""></dt>
                    <dd>
                        <p>${file.description}</p>
                        <p>
                            <span>$${file.price}</span><span>39收藏</span>
                        </p>
                    </dd>
                </dl>`
        });
        con.innerHTML += str;
        new BScroll('#content', {
            probeType: 2
        })
    }
})