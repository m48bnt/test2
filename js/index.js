(function () {

  'use strict';
  // "https://api.instagram.com/v1/users/691623/media/recent/?access_token=691623.1419b97.479e4603aff24de596b1bf18891729f3"
  fetch('data.json')
      .then(function(response) {
        return response.json();
      })
      .then(function (data) {

        var container = document.createElement('div');
        container.className = "container";

        var elem = document.createElement('div');
        elem.className = "masonry";
        var date = new Date();
        var items = data.data || [];

        items.forEach(function(item) {
          var createdDate = new Date(parseInt(item.created_time) * 1000);
          var interval = new Date(date - createdDate);
          var relDate = ((interval.getUTCDate() - 1) >= 1) ? interval.getUTCDate() - 1 + "д" : interval.getUTCHours() + "ч";
          var divItem = document.createElement('div');
          divItem.className = "item";
          var divAuthor = document.createElement('div');
          divAuthor.className = "author-block";
          divAuthor.innerHTML =
              (item.location !== null)
                  ? "<div class='avatar'><img src='"+item.user.profile_picture+"'></div><div class='name'><b>"+item.user.full_name+"</b></br>"+item.location.name+"</div><div class='rel-date'>"+relDate+"</div>"
                  : "<div class='avatar'><img src='"+item.user.profile_picture+"'></div><div class='name only-name'><b>"+item.user.full_name+"</b></div><div class='rel-date'>"+relDate+"</div>";
          divItem.appendChild(divAuthor);
          var divImg = document.createElement('div');
          divImg.className = "img-block";
          divImg.innerHTML = "<img src='"+item.images.standard_resolution.url+"'>";
          divItem.appendChild(divImg);
          var divMessage = document.createElement('div');
          divMessage.className = "message-block";
          var divLikes = document.createElement('a');
          divLikes.className = "likes";
          divLikes.onclick = function () {
            alert(item.id)
          };
          divLikes.innerHTML = "<i></i><span>"+item.likes.count+"</span>";
          divItem.appendChild(divLikes);
          divMessage.innerHTML = "<div class='message'>"+item.caption.text+"</div>";
          divItem.appendChild(divMessage);
          elem.appendChild(divItem);
        });
        container.appendChild(elem);
        document.body.appendChild(container);
      })
      .catch( alert );
})();