const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '7200'
};

const RESP_HEADERS = Object.assign({
    'Content-Type': "application/json; charset=utf-8"
}, CORS_HEADERS);

const MAX_RECURSION = 20;

export const onRequestOptions = async () => new Response(null, { status: 204, headers: CORS_HEADERS });

export const onRequestPost: PagesFunction = async (ctx) => {
    const resp: any = {
        reason: "OK",
        content: ""
    };
    let status = 200;

    if (ctx.request.headers.get("content-type") !== "application/json") {
        return new Response(null, { status: 400, headers: CORS_HEADERS });
    }

    const { url } = await ctx.request.json();
    if (url === null) {
        resp.reason = "No URL to resolve";
        status = 400;
    } else {
        try {
            resp.content = await followRedirects(url);
        } catch (e) {
            resp.reason = "Some redirection could not be resolved";
            status = 500;
        }
    }

    return new Response(JSON.stringify(resp), {
        status,
        headers: RESP_HEADERS
    });
}

const followRedirects = async (url: string, rec = 0): Promise<Array<{ url: string, status: number }>> => {
    if (rec > MAX_RECURSION) {
        return [];
    }

    const currentResolution = await resolve((new URL(url)).href);
    const link = {
        url: currentResolution.url,
        status: currentResolution.status
    };

    return isRedirect(currentResolution) ?
        [link, ...await followRedirects(currentResolution.headers.get("Location"), rec + 1)] :
        [link];
}

const isRedirect = (response: Response) => [301, 302, 307, 308].includes(response.status) &&
    response.headers.has("Location");

const resolve = async (url: string) => await fetch(url, { method: "HEAD", redirect: "manual" });