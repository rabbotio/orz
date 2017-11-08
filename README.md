# nap-god
An admin panel for NAP

# Use
- Run `nap`
- Add `nap` endpoint to `.env`

# TODO
- [x] it should separated by services 
- [x] it should separated by environments
- [ ] it should have `client_id`
- [ ] it should generate `client_secret`
- [ ] it should generate `access_token` that contain `exp`, `client_id`

# nap-provider
- [ ] it can verify `access_token` by `client_secret`
- [ ] it should provide `getUserNames` if `access_token` is provide.
- [ ] it should back off wrong request.

# TOHAVE
- [ ] it should have `scope`
- [ ] it should read only in `scope`
- [ ] it should generate `refresh_token` that contain `exp`, `client_id`
- [ ] it can regenerate `access_token` if `refresh_token` not expire.
