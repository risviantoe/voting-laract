<?php

namespace App\Http\Controllers;

use App\Models\Members;
use App\Models\Token;
use App\Models\Voting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VotingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($token)
    {
        $members = Members::all();
        return Inertia::render('Homepage', [
            'title' => 'IMMSA',
            'token' => $token,
            'members' => $members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $dataToken = Token::where('token', $request->token)->first();

        if (!$dataToken) return redirect()->back()->with('error', 'Token tidak valid.');
        if ($dataToken->used !== 0) {
            return redirect()->back()->with('error', 'Token hanya dapat digunakan satu kali.');
        }

        $vote = new Voting();
        $vote->pilihan_1 = $request->pilihan1;
        $vote->pilihan_2 = $request->pilihan2;
        $vote->pilihan_3 = $request->pilihan3;
        $vote->pilihan_4 = $request->pilihan4;
        $vote->pilihan_5 = $request->pilihan5;
        $vote->token = $request->token;
        $vote->save();

        $dataToken->used = 1;
        $dataToken->save();
        return redirect()->back()->with('success', 'Terimakasih telah berpartisipasi dalam pemilihan ketua IMMSA.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Voting  $voting
     * @return \Illuminate\Http\Response
     */
    public function show(Token $token)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Voting  $voting
     * @return \Illuminate\Http\Response
     */
    public function edit(Voting $voting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Voting  $voting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Voting $voting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Voting  $voting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Voting $voting)
    {
        //
    }
}
