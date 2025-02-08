
$(function () {
    $(".uk-breadcrumb").hide()

    $(".uk-navbar-dropdown-nav a").on("click", (event) => {
        event.preventDefault();

        //open the requested page in the iframe
        $("iframe").attr("src", $(event.target).attr("href"));

        //update the breadcrumb
        $("#language").text($(event.target).parents(".uk-navbar-dropdown").siblings("a").text().toString());
        $("#toolkit").text($(event.target).text());
        $(".uk-breadcrumb").show();

        //mark the active page in the navigation
        $(event.target).parent().siblings("li").removeClass("uk-active");
        $(event.target).parent().addClass("uk-active");
    })

    $(".uk-navbar-dropdown-nav a").first().trigger("click")
});