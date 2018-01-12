<?php
	require_once( 'php_scripts/album.php' );
	require_once( 'php_scripts/artist.php' );

	//	print_r( $_POST );

	$artist_name         = $_POST["artist_name"];
	$album_name          = $_POST["album_name"];
	$album_artist_id     = $_POST["album_artist_id"];
	$album_tracks        = $_POST["album_tracks"];
	$album_track_lengths = $_POST["album_track_lengths"];

	if ( isset( $artist_name ) ) {
		$successful_add = $Artists->create( $artist_name );

		if ( ! $successful_add ) {
			$error_msg = "An error occurred while adding new artist (\"$artist_name\").\n\n$artist_name may already exist.";
		}
	} else if ( isset( $album_name ) ) {
		if ( ! isset( $album_artist_id ) || $album_artist_id == "" || $album_artist_id <= 0 ) {
			$error_title = "Missing Artist";
			$error_msg   = "Please choose an artist for the new album";
		} else {
			$successful_add = $Albums->create( $album_artist_id, $album_name, $album_tracks, $album_track_lengths );

			if ( ! $successful_add ) {
				$error_msg = "An error occurred while adding new album (\"$album_name\").\n\n$album_name may already exist.";
			}
		}
	}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">

        <title>Assignment 8 - Music Manager</title>

        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="material.min.css">
        <link rel="stylesheet" href="main.css">
        <script src="js/main.js"></script>
    </head>
    <body>
        <div class="layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header class="header mdl-layout__header mdl-layout__header--waterfall">
                <div class="mdl-layout__header-row">
                    <!--                    <span class="mdl-layout-title">Home</span>-->
                    <div class="mdl-layout-spacer"></div>
                    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
                        <li class="mdl-menu__item">
                            <a target="_blank" href="http://antechdevelopment.com">Other Sites</a>
                        </li>
                        <li class="mdl-menu__item">
                            <a target="_blank" href="mailto:joshua@antechdevelopment.com">Contact</a>
                        </li>
                    </ul>
                </div>
            </header>
            <div class="drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header class="drawer-header">
                    <div class="avatar-dropdown">
                        <span>hello@example.com</span>
                        <div class="mdl-layout-spacer"></div>
                        <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                            <i class="material-icons" role="presentation">arrow_drop_down</i>
                            <span class="visuallyhidden">Accounts</span>
                        </button>
                        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
                            <li class="mdl-menu__item">
                                <i class="material-icons">close</i>
                                <span>&emsp;</span>
                                <span>Logout</span>
                            </li>
                        </ul>
                    </div>
                </header>
                <nav class="navigation mdl-navigation mdl-color--blue-grey-800">
                    <a class="mdl-navigation__link" href="">
                        <i class="mdl-color-text--blue-grey-400 material-icons"
                           role="presentation">home
                        </i>
                        Home
                    </a>
                    <a class="mdl-navigation__link" id="add-artist-button">
                        <i class="mdl-color-text--blue-grey-400 material-icons"
                           role="presentation">person_add
                        </i>
                        Add an Artist
                    </a>
                    <a class="mdl-navigation__link" id="add-album-button">
                        <i class="mdl-color-text--blue-grey-400 material-icons"
                           role="presentation">album
                        </i>
                        Add an Album
                    </a>
                </nav>
            </div>
            <main class="mdl-layout__content mdl-color--grey-100">
                <div class="mdl-grid content">
                    <div class="cards mdl-cell mdl-cell--12-col mdl-grid">
						<?php
							foreach ( $Albums->get_all() as $album ) {
								/** @noinspection PhpUndefinedMethodInspection */
								$tracks = $album->get_all_tracks();
								?>
                                <div class="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col mdl-badge mdl-badge--overlap"
                                     data-badge="<?php echo count( $tracks ) ?>">
                                    <div class="mdl-card__title mdl-color--primary mdl-shadow--2dp">
                                        <h1 class="mdl-card__title-text">
											<?php echo $album->name; ?>
                                        </h1>
                                        <h5 class="mdl-card__subtitle-text mdl-color-text--primary-contrast">
                                            <span>&emsp14;</span>
                                            <span>
                                                <?php echo $album->artist->name; ?>
                                            </span>
                                        </h5>
                                    </div>
                                    <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                                        <ol class="mdl-list">
											<?php
												foreach ( $tracks as $track ) {
													?>
                                                    <li class="mdl-list__item mdl-list__item--two-line">
                                                        <span class="mdl-list__item-primary-content">
                                                            <span class="mdl-list__item-avatar mdl-color-text--accent-contrast mdl-color--accent mdl-shadow--4dp">
                                                                <?php echo $track->position_on_album ?>
                                                            </span>
                                                            <span>
                                                                <?php echo $track->name ?>
                                                            </span>
                                                            <span class="mdl-list__item-sub-title">
	                                                            <?php echo $track->length; ?>
                                                            </span>
                                                        </span>
                                                    </li>
													<?php
												} ?>
                                        </ol>
                                    </div>
                                </div>
								<?php
							} ?>
                    </div>
                </div>
            </main>
        </div>
        <dialog id="add-artist-dialog" class="mdl-dialog">
            <form action="" method="post">
                <h4 class="mdl-dialog__title">Add an Artist</h4>
                <div class="mdl-dialog__content mdl-grid--no-spacing">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col">
                        <input class="mdl-textfield__input"
                               type="text"
                               required
                               id="artist_name"
                               name="artist_name">
                        <label class="mdl-textfield__label" for="artist_name">Artist Name</label>
                    </div>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="submit" class="mdl-button add-button">Add</button>
                    <button type="button" class="mdl-button close">Cancel</button>
                </div>
            </form>
        </dialog>
        <dialog id="add-album-dialog" class="mdl-dialog">
            <form action="" method="post">
                <h4 class="mdl-dialog__title">Add an Album</h4>
                <div class="mdl-dialog__content mdl-grid--no-spacing">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col">
                        <input class="mdl-textfield__input"
                               type="text"
                               required
                               id="album_name"
                               name="album_name">
                        <label class="mdl-textfield__label" for="album_name">Album Name</label>
                    </div>
                    <br>
                    <br>
                    <div class="mdl-textfield mdl-js-textfield mdl-cell--12-col mdl-grid--no-spacing">
                        <!--suppress HtmlFormInputWithoutLabel -->
                        <input type="text"
                               style="width: 0;height: 0;opacity:0;"
                               name="album_artist_id"
                               required
                               id="album_artist_id" />
                        <button id="album_artist_name_selector"
                                class="mdl-button mdl-js-button"
                                type="button">
                            <span>Select an Artist</span>
                            <i class="material-icons">arrow_drop_down</i>
                        </button>

                        <script type="text/javascript">
                            function setArtistForNewAlbum (albumArtistId, albumArtistName) {
                                document.querySelector("#album_artist_id").setAttribute("value", albumArtistId);
                                document.querySelector("#album_artist_name_selector span").innerText = albumArtistName;
                            }
                        </script>

                        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-cell--12-col"
                            for="album_artist_name_selector">
							<?php foreach ( $Artists->get_all() as $artist ) { ?>
                                <li class="mdl-menu__item"
                                    onclick="setArtistForNewAlbum(<?php echo $artist->id; ?>, '<?php echo $artist->name; ?>')">
									<?php echo $artist->name; ?>
                                </li>
							<?php } ?>
                        </ul>
                    </div>
					<?php for ( $i = 1; $i <= 30; $i ++ ) { ?>
                        <div <?php echo $i == 1 ? "" : "hidden" ?>
                                id="add_track_<?php echo $i ?>"
                                class="mdl-grid--no-spacing"
                                style="display: flex;justify-content: space-between;">
                            <div class="mdl-cell--6-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input add_tracks"
                                       type="text"
									<?php echo $i == 1 ? "required" : "" ?>
                                       id="tracks_<?php echo $i ?>"
                                       name="album_tracks[]">
                                <label class="mdl-textfield__label" for="tracks_<?php echo $i ?>">
                                    Track <?php echo $i ?></label>
                            </div>
                            <div class="mdl-cell--4-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input add_tracks_length"
                                       type="text"
                                       pattern="[0-5]?[0-9]:[0-5][0-9]"
                                       id="track_length_<?php echo $i ?>"
                                       name="album_track_lengths[]">
                                <label class="mdl-textfield__label" for="track_length_<?php echo $i ?>">Length (mm:ss)
                                </label>
                            </div>
                        </div>
					<?php } ?>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="submit" class="mdl-button add-button">Add</button>
                    <button type="button" class="mdl-button close">Cancel</button>
                </div>
            </form>
        </dialog>
		<?php if ( isset( $error_msg ) || isset( $error_title ) ) {
			$title = isset( $error_title ) ? $error_title : "Error";
			$msg   = isset( $error_msg ) ? $error_msg : "An unknown error occurred.<br><br>Please try again later.";
			?>
            <dialog id="error-dialog" class="mdl-dialog">
                <h4 class="mdl-dialog__title mdl-color-text--red">
					<?php echo $title ?>
                </h4>
                <div class="mdl-dialog__content">
                    <p>
						<?php echo $msg ?>
                    </p>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="button" class="mdl-button close">Ok</button>
                </div>
            </dialog>
		<?php } ?>
        <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    </body>
</html>
