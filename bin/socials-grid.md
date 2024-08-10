<div className="grid grid-cols-4 gap-6">
                    {item.socials
                      .sort((a, b) => a.order - b.order)
                      .map((social) => {
                        // @ts-ignore
                        const { main, background, icon } = returnStyles(
                          social.site
                        );
                        return (
                          <div
                            style={{
                              background,
                              border: "2px solid" + main + "20",
                            }}
                            className="w-48 h-48 aspect-square rounded-3xl p-3 hover:shadow-xl transition-all duration-150 group relative "
                          >
                            {dashboard && (
                              <Button
                                onClick={() => {
                                  if (dashboard)
                                    setData((org) => ({
                                      ...org,
                                      content: [
                                        ...org.content.filter(
                                          (x) => x.id !== item.id
                                        ),
                                        {
                                          ...item,
                                          socials: [
                                            ...item.socials.filter(
                                              (x) => x.id !== social.id
                                            ),
                                          ],
                                        },
                                      ],
                                    }));
                                }}
                                variant={"secondary"}
                                className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -top-4 -left-4 bg-white p-2 rounded-full shadow-xl shadow-zinc-400 pointer-events-none  group-hover:pointer-events-auto cursor-pointer"
                              >
                                <Trash></Trash>
                              </Button>
                            )}
                            <img
                              className="w-14 rounded-xl"
                              src={
                                socialList.includes(social.site)
                                  ? icon
                                  : `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${social.link}/&size=256`
                              }
                              alt=""
                            />
                            {/* <img className="w-14" src={icon} alt="" /> */}
                            <textarea
                              disabled={!dashboard}
                              onChange={(e) => {
                                if (dashboard)
                                  setData((org) => ({
                                    ...org,
                                    content: [
                                      ...org.content.filter(
                                        (x) => x.id !== item.id
                                      ),
                                      {
                                        ...item,
                                        socials: [
                                          ...item.socials.filter(
                                            (x) => x.id !== social.id
                                          ),
                                          {
                                            ...social,
                                            title: e.target.value,
                                          },
                                        ],
                                      },
                                    ],
                                  }));
                              }}
                              value={social.title}
                              className={`${
                                dashboard &&
                                "hover:bg-opacity-50 hover:bg-zinc-400"
                              } p-1 text-base  text-zinc-700 focus-within:outline-none bg-transparent w-40  resize-none  rounded-xl duration-200`}
                            ></textarea>
                            <div className="w-40  truncate text-ellipsis  text-sm  text-zinc-700">
                              {social.link
                                .split("")
                                .splice(social.link.includes("https") ? 12 : 11)
                                .join("")}
                            </div>
                            {/* <div className="bg-white rounded-2xl p-2 w-fit shadow-lg">
                          </div> */}
                          </div>
                        );
                      })}
                    {dashboard && (
                      <Dialog>
                        <DialogTrigger className="w-fit">
                          <Button
                            className={`w-48 h-48 aspect-square rounded-3xl bg-background text-foreground ${
                              isLoading && "bg-background"
                            } hover:bg-secondary hover:text-secondary-foreground  border-[1px] border-foreground`}
                          >
                            {isLoading ? (
                              <LoaderCircle
                                size={40}
                                className="rotate text-blue-600"
                              />
                            ) : (
                              <PlusCircle size={40}></PlusCircle>
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add link</DialogTitle>
                            <DialogDescription className="flex flex-col gap-3 items-center">
                              <Input
                                value={url}
                                onChange={(e) => {
                                  setUrl(e.target.value);
                                }}
                                placeholder="(Use full link for ex:https://www.youtube.com/@ThePrimeagen)"
                              ></Input>
                              <DialogClose asChild>
                                <Button
                                  disabled={isLoading}
                                  onClick={async () => {
                                    setIsLoading(true);
                                    if (url.includes("http")) {
                                      const site = url.includes("youtube")
                                        ? "youtube"
                                        : url.includes("instagram.com")
                                        ? "instagram"
                                        : url.includes("facebook.com")
                                        ? "facebook"
                                        : url.includes("twitter.com")
                                        ? "twitter"
                                        : url.includes("wa.me")
                                        ? "whatsapp"
                                        : url.includes("snapchat.com")
                                        ? "snapchat"
                                        : url.includes("dribble.com")
                                        ? "dribble"
                                        : url.includes("github.com")
                                        ? "github"
                                        : url.includes("linkedin.com")
                                        ? "linkedin"
                                        : url.includes("reddit.com")
                                        ? "reddit"
                                        : url.includes("behance.com")
                                        ? "behance"
                                        : "";

                                      // console.log(await fetchYouTubeData(url));
                                      // console.log();

                                      const youtubeResponse =
                                        await fetchYouTubeData(url);
                                      const title = youtubeResponse.title;

                                      setData((org) => ({
                                        ...org,
                                        content: [
                                          ...org.content.filter(
                                            (x) => x.id !== item.id
                                          ),
                                          {
                                            ...item,
                                            socials: [
                                              ...item.socials,
                                              {
                                                id: crypto.randomUUID(),
                                                timestamp: Date.now(),
                                                order: item.socials.length,
                                                site,
                                                link: url,
                                                title:
                                                  site === "youtube"
                                                    ? title
                                                    : capitalizeFirstLetter(
                                                        site || "title"
                                                      ),
                                                otherData: {
                                                  thumbnail: "",
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      }));
                                    } else {
                                      toast.error("Invalid Link!", {
                                        position: "bottom-center",
                                        autoClose: 5000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                      });
                                    }
                                    setIsLoading(false);
                                    setUrl("");
                                  }}
                                >
                                  Save
                                </Button>
                              </DialogClose>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>